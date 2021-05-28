import { AlertService } from './../services/alert.service';
import { NetworkService } from 'src/app/services/network.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkGuard implements CanActivate {
  status: string;
  constructor(
    private networkService: NetworkService,
    private alertService: AlertService,
    private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.networkService.isConnected);
      
      if (!this.networkService.isConnected) {
        this.status = "Vous êtes déconnecté";
        console.log( this.status);
        this.alertService.presentToast(this.status,'danger')
        this.router.navigateByUrl('/page_not_found')
        return false;
        
      } else {
        this.status = "Vous êtes en ligne";
        console.log( this.status);
        this.alertService.presentToast(this.status,'success')
        return true;
      }

  }
  
}
