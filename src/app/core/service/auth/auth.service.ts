import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceConfigs } from '../../serviceconfig';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { SessionsService } from '../session/sessions.service';
import { ToastrServiceClass } from '../toastr.service';

@Injectable()
export class AuthService {
  BASE_URL: string = environment.baseUrl;
  private accessToken: string;
  private refreshTokenTimeout: NodeJS.Timeout;
  private destory$: Subject<number> = new Subject();
  constructor(
    private http: HttpClient,
    private serviceConfig: ServiceConfigs,
    private sessionService: SessionsService,
    private loader: ToastrServiceClass
  ) {}

  hasPermission(permissionName: string): boolean {
    let isPermissionExist = JSON.parse(
      this.sessionService.getPermissions()
    ).some((permission: any) => {
      return permission.permission === permissionName;
    });

    if (isPermissionExist) {
      return true;
    } else {
      return false;
    }
  }

  loginUser(data: any) {
    return this.http.post<any>(this.BASE_URL + 'auth/login', data);
  }

  validateOTP(otp: string, otpType: string) {
    let mailID = this.sessionService.getLocalStorageKey('userEmail');
    let request = {
      siteID: 0,
      userID: 0,
      emailID: mailID,
      otp: otp,
      otpType: otpType,
    };
    return this.http.post<any>(this.BASE_URL + 'Auth/ValidateOTP', request);
  }

  forgotPassword(emailID: string, type: string) {
    let request = {
      emailID: emailID,
      requestType: type,
    };
    return this.http.post<any>(this.BASE_URL + 'Auth/ForgotPassword', request);
  }

  resetPassword(data: any) {
    let request = {
      siteID: 0,
      userID: 0,
      uniqueID: data.uniqueID,
      emailID: data.emailID,
      password: data.password,
    };
    return this.http.post<any>(this.BASE_URL + 'Auth/ResetPassword', request);
  }

  exchangeRefreshToken(tokens) {
    let request = {
      user_id: this.sessionService.getUserId(),
      email: this.sessionService.getUserEmail(),
      refreshToken: tokens.refreshToken,
    };
    return this.http
      .post<any>(this.BASE_URL + `auth/refresh-token`, request)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
