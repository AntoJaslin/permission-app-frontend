import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SessionsService } from '../service/session/sessions.service';
import { AppUserRoleEnum } from '../constants/app-userRole.enum';
import { environment } from 'src/environments/environment';
import { ToastrServiceClass } from '../service/toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  enviroment = environment;
  constructor(
    private router: Router, 
    private sessionService: SessionsService,
    private loader:ToastrServiceClass,
) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkToken(route);
  }
  canLoad(route: Route, next: ActivatedRouteSnapshot): boolean {
    return this.checkToken(next);
  }
  checkToken(route: ActivatedRouteSnapshot) {
    let accessToken = this.sessionService.getAccesToken();
    if (accessToken) {
      return true;
    } else {
      this.loader.error('Your session is timeout');
      //SSO Login disabled
      //window.location.href = this.enviroment.ssoBaseUrl;
      // window.location.href = '/login';
      this.router.navigateByUrl('/login')
      return false;
    }
  }
}
