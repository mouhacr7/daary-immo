import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient,
              private env: EnvService) { }

    getAgents(): Observable<any> {
      return this.http.get('/mobile/agents', {})
      .pipe(
        tap(_ => console.log('response received')),
        catchError(this.handleError('agents', []))
      );
    }
    getSingleAgent(id: number): Observable<any> {
      return this.http.get(`/mobile/agent/${id}`);
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
  // getPublicContent(): Observable<any> {
  //   return this.http.get( this.env.API_URL+ '/', { responseType: 'text' });
  // }

  // getUserBoard(): Observable<any> {
  //   return this.http.get(this.env.API_URL + 'user', { responseType: 'text' });
  // }


  // getAdminBoard(): Observable<any> {
  //   return this.http.get(this.env.API_URL + 'admin', { responseType: 'text' });
  // }
}