import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        return this.checkLogin(url);
    }

  public checkLogin(url: string) : boolean {
      if(this.authService.isLoggedIn())
        return true;

      this.authService.setRedirectUrl(url);

      this.router.navigate(['/login']);
      return false;


  }
}
