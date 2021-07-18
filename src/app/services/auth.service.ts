import { User } from './../models/user';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable,
  OnInit
} from '@angular/core';
import {
  map,
  shareReplay,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import {
  Observable,
  of ,
  BehaviorSubject,
  throwError,
  from
} from 'rxjs';
import {
  Storage
} from '@ionic/storage';
import {
  catchError
} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
// create an instance of the JWT decoder utility and use it directly:
const helper = new JwtHelperService();
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: Observable<any>;
	private userData = new BehaviorSubject(null);

  token: any;
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    public storage: Storage,
    private plt: Platform,
    private router: Router
  ) {
    this.loadStoredToken();
  }

  
  loadStoredToken() {
		const platformObs = from(this.plt.ready());

		this.user = platformObs.pipe(
			switchMap(() => {
				return from(this.storage.get(TOKEN_KEY));
			}),
			map((token) => {
				console.log('token from storage: ', token);
				if (token) {
					const decoded = token;
					console.log('decoded: ', decoded);
          this.isLoggedIn.next(true);
					this.userData.next(decoded);
					return true;
				} else {
          this.isLoggedIn.next(false);
					return null;
				}
			})
		);
	}

  public get currentUserValue(): User {
  return this.userData.value;
  }

  login(phone_number: number, password: String): Observable < any > {
    return this.http.post('/mobile/login', {
      phone_number: phone_number,
      password: password
    }, httpOptions).pipe(
      take(1),
      // map((res) => {
      //   return res
      // }),
      switchMap((token) => {
        console.log(token);
        
				const decoded = token;
        console.log(decoded);
        
				console.log('login decoded: ', decoded);
				this.userData.next(decoded);

				const storageObs = from(this.storage.set(TOKEN_KEY, token));
				return storageObs;
			}),
      catchError(this.handleError)
    );
  }

  register(data): Observable < any > {
    return this.http.post('/mobile/register', data).pipe(
      tap(_ => this.log('registered successfully!!')),
      catchError(this.handleError)
    );
  }
  forgotPassword(phone_number: string): Observable < any > {
    return this.http.post('/mobile/forgot_password', {
      phone_number: phone_number
    }, httpOptions).pipe(
      tap(token => {
        this.token = token;
        console.log(this.token);
        return token;
      }),
    )
  }
  verification_code(verification_code: string, phone_number: string): Observable < any > {
    return this.http.post('/mobile/verify_mobile', {
      phone_number: phone_number,
      verification_code: verification_code
    }, httpOptions).pipe(
      tap(_ => this.log('registered successfully!!')),
      catchError(this.handleError)
    );
  }
  reset_password(data): Observable < any > {
    return this.http.post('/mobile/reset_password', data).pipe(
      tap(_ => this.log('Password reset done successfully!')),
      catchError(this.handleError)
    );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.userData.next(null);
			window.location.reload();
		});
  }

  userInfos(): Observable < any > {
    return this.http.get('/mobile/user', {})
      .pipe(
        tap(res => res['user']),
        map(res => res['user']),
        shareReplay(),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error}`;
    } else {
      // Server-side errors
      errorMessage = `${error.status}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }



}
