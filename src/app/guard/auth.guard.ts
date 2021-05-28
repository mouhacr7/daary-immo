import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenSessionStorageService } from '../services/token-session-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}
 // uses auth.service to check if user has token in storage. Returns true if there is a token
	// returns false if user does not have a token and navigates to initial login page.
	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.authService.user.pipe(
			take(1),
			map((user) => {
				console.log('Can activate: ', user);
				if (!user) {
					this.alertCtrl
						.create({
							header: 'Page non-autorisé',
							message: 'Vous n\'étes pas autorisé à accéder à cette page .',
							buttons: ['OK'],
						})
						.then((alert) => alert.present());

					this.router.navigateByUrl('/login');
					return false;
				} else {
					return true;
				}
			})
		);
	}
}