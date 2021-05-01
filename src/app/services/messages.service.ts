import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { TokenSessionStorageService } from './token-session-storage.service';
import { Properties } from '../models/properties';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Message } from '../models/message';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  token: any;
  isLoggedIn: boolean;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {}

  getAgentMessages(): Observable<any> {
    return this.http.get<Message>('/mobile/message', {})
    .pipe(
      map(res => res['messages']),
      catchError(this.handleError('properties', []))
    );
  }
  MessageID(id: number): Observable<any> {
    return this.http.get<Properties[]>(`/mobile/message/replay/${id}`, {})
    .pipe(
      tap(_ => console.log('response received = ' + id)),
      catchError(this.handleError('properties', []))
    );
  }
  // return this.http.post('/mobile/register', data).pipe(
  //   tap(_ => this.log('registered successfully!!')),
  //   catchError(this.handleError('register', []))
  // );
  replayMessage(data): Observable<any> {
    return this.http.post<Message>(`/mobile/message/replay`, data)
    .pipe(
      tap(_ => console.log('response received')),
      catchError(this.handleError('properties', []))
    );
  }
  SendMessage(data): Observable<any> {
    return this.http.post<Message>('/mobile/property/message', data, {observe: 'response'})
    .pipe(
      tap( // Log the result or error
        data => {
           if (data['status'] === 200 ) {
            this.alertService.presentToast('Message envoyé avec succés :) !!', 'success');
            this.alertService.dismissLoading()
          } else {
            this.alertService.presentToast('Une erreur s\'est produit au moment de l\'envoi du message :( !! Veuillez réessayer', 'danger');
            this.alertService.dismissLoading()
          }
          console.log(data)
        },
        error => {
          this.alertService.presentToast('Une erreur s\'est produit au moment de l\'envoi du message :( !! Veuillez réessayer', 'danger');
          this.alertService.dismissLoading()
          console.log(error)
        }
      ),
      shareReplay(),
      catchError(this.handleError)
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

