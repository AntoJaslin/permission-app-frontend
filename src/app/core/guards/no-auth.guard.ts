import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SessionsService } from '../service/session/sessions.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  enviroment = environment;
  constructor(private router: Router, private sessionService: SessionsService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkToken();
  }
  canLoad(route: Route): boolean {
    return this.checkToken();
  }
  checkToken() {
    const accesToken = this.sessionService.getAccesToken();
    let currentUser: any = this.sessionService.getLocalStorageKey('currentUser');
  
    if (accesToken) {
      if(currentUser.roleInfo.length > 0) {
        this.router.navigateByUrl('/dashboard')
      } else {
        this.router.navigateByUrl('/role-unassign-redirect')
      }
      return false;
    } else {
      return true;
    }
  }
}
