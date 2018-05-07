import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor (private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean { // guard returns boolean: logged in or not?
    if (this.authService.user$.getValue()) {
      return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']); // redirect to login page if not logged in
    return false;
  }
}
