import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Properties } from '../models/properties';

const STORAGE_KEY = 'favoriteProperties';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  
  // public propertiesServices: PropertiesService
  constructor(
  private http: HttpClient,
  public storage: Storage) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  isFavorite(popertyId) {
    return this.getAllFavoriteProperties().then(result => {
      return result && result.indexOf(popertyId) !== -1;
    });
  }
 
  favoriteProperty(popertyId) {
    return this.getAllFavoriteProperties().then(result => {
      if (result) {
        result.push(popertyId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [popertyId]);
      }
    });
  }
 
  unfavoriteProperty(popertyId) {
    return this.getAllFavoriteProperties().then(result => {
      if (result) {
        var index = result.indexOf(popertyId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }
 
  getAllFavoriteProperties() {
    return this.storage.get(STORAGE_KEY);
  }

  // Send to api
  favouriteProperty(id: any, property :any) {
    return this.http.post<Properties>(`/mobile/toggle_favorite/${id}`, property).pipe(
      tap(()=> {
        this.refreshNeeded$.next();
        console.log(`favourite property added : id=${id}`);
      }),
      catchError(this.handleError<Properties>('favouriteProduct'))
    );
  }

    // Error handler
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
     /** Log a HeroService message with the MessageService */
     private log(message: string) {
      console.log(message);
    }
}
