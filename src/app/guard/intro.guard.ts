import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

constructor(
            private storage: Storage,
            private router: Router){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isComplete = await this.storage.get('introComplete')
      
    if (!isComplete) {
      this.router.navigateByUrl('/intro')
    }
    return isComplete;
  }
  
}
