import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { catchError } from 'rxjs/operators';
import { TokenSessionStorageService } from './token-session-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: any;
  constructor(
    private http: HttpClient,
    public storage: Storage,
    private storageService: StorageService,
    private tokenSession: TokenSessionStorageService,
    ) {}

  login(phone_number: number, password: String): Observable<any>  {
    return this.http.post('/mobile/login',
      {
        phone_number: phone_number,
        password: password
      }, httpOptions
    ).pipe(
      tap(token => {
        this.storage.set('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.tokenSession.getToken()
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(data): Observable<any>  {
    return this.http.post('/mobile/register', data).pipe(
      tap(_ => this.log('registered successfully!!')),
      catchError(this.handleError('register', []))
    );
  }
  forgotPassword(phone_number: string): Observable<any>  {
    return this.http.post('/mobile/forgot_password',{
      phone_number: phone_number
    }, httpOptions).pipe(
      tap(token => {
        this.token = token;
        console.log(this.token);
        this.isLoggedIn = true;
        return token;
      }),
    )
  }
  verification_code(verification_code: string, phone_number: string): Observable<any>  {
    return this.http.post('/mobile/verify_mobile',{
      phone_number: phone_number,
      verification_code: verification_code
    }, httpOptions).pipe(
      tap(_ => this.log('registered successfully!!')),
      catchError(this.handleError('register', []))
    );
  }
  reset_password(data): Observable<any>  {
    return this.http.post('/mobile/reset_password', data).pipe(
      tap(_ => this.log('Password reset done successfully!')),
      catchError(this.handleError('Reset password', []))
    );
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http.post('/mobile/logout', { headers: headers })
      .pipe(
        tap(data => {
          this.tokenSession.signOut();
          this.storage.remove("token");
          this.storageService.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
  }

  user(): Observable<any> {
    return this.http.get('/mobile/user', {})
      .pipe(
        tap(_ => this.log('response received')),
        shareReplay(),
        catchError(this.handleError('user', []))
      );
  }

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

  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}