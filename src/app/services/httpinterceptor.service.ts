import {
  AuthService
} from 'src/app/services/auth.service';
import {
  Storage
} from '@ionic/storage';
import {
  Injectable
} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import {
  Observable,
  throwError,
  from
} from 'rxjs';
import {
  map,
  catchError,
  switchMap
} from 'rxjs/operators';

import {
  AlertController
} from '@ionic/angular';
import {
  AlertService
} from './alert.service';


const TOKEN_KEY = 'token';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  protected url = 'https://daary-immo.com/api';
  protected debug = true;
  accessToken: string;
  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private storage: Storage
  ) {}

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    // YOU CAN ALSO DO THIS
    const token = this.storage.get(TOKEN_KEY);

    return from(token)
      .pipe(
        switchMap(token => {
          if (token) {
            // token = this.tokenSession.getUser()['token'];
            this.accessToken = token['token'];
            request = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${this.accessToken}`)
            });
          }

          if (this.debug) {
            request = request.clone({
              url: this.url + request.url
            });
          }

          return next.handle(request).pipe(
            // map((event: HttpEvent < any > ) => {
            //   if (event instanceof HttpResponse) {
            //     console.log('event--->>>', event);
            //   }
            //   return event;
            // }),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                if (error.error.success === false) {
                  this.presentAlert('Connexion échouée');
                }
              }
              return throwError(error);
            }));
        })
      );
  }
  async presentAlert(reason) {
    const alert = await this.alertController.create({
      header: status + ' Error',
      subHeader: 'Subtitle',
      message: reason,
      buttons: ['OK']
    });

    await alert.present();
  }
}
