import { StorageService } from './storage.service';
import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { AlertController } from '@ionic/angular';
import { AlertService } from './alert.service';


const TOKEN_KEY = 'auth-user';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    protected url   = 'https://daary-immo.com/api';
    protected debug = true;

    constructor(
        private alertController: AlertController,
        private alertService: AlertService,
        private storage: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // YOU CAN ALSO DO THIS
        // const token = this.authenticationService.getToke()   this.token = this.tokenSession.getUser()['token'];
        
    return from(this.storage.get(TOKEN_KEY))
    .pipe(
        switchMap(token => {
            if (token) {
                // token = this.tokenSession.getUser()['token'];
                console.log(token);
                request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
            }

            if (this.debug) {
                request = request.clone({ url: this.url + request.url});
            }

            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do nothing for now
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    const status =  error.status;
                    const reason = error.error.error;
                    const message = error.message;
                    console.log(status);
                    
                    if (reason === 'invalid_credentials') {
                        this.alertService.basciAlert( 'Oups!!!','Indentifiants incorrects :( Veuillez vérifier vos identifiants !',  ['OK'])
                    } else {
                        this.alertService.basciAlert('Oups!!!','Erreur liée au serveur, veuillez réessayer !',  ['OK'])
                    }
                    console.log(reason)
                    return throwError(error);
                })
            );
        })
    );
 }
    async presentAlert(status, reason) {
        const alert = await this.alertController.create({
            header: status + ' Error',
            subHeader: 'Subtitle',
            message: reason,
            buttons: ['OK']
        });

        await alert.present();
    }
}