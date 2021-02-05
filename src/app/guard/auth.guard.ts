import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenSessionStorageService } from '../services/token-session-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenSessionStorageService: TokenSessionStorageService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = this.tokenSessionStorageService.getToken();
      if (currentUser) {
          // authorised so return true
          return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
  }
}