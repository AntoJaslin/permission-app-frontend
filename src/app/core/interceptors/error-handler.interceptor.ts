import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  mergeAll,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { ToastrServiceClass } from '../service/toastr.service';
import { ApiStatusCode, HttpStatusCode } from '../constants/http-statuscode';
import { SessionsService } from '../service/session/sessions.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppErrorsEnum } from '../constants/app-errors.enum';
import { AuthService } from '../service/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor, OnDestroy {
  enviroment = environment;
  private destory$: Subject<number> = new Subject();
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private loader: ToastrServiceClass,
    public sessionService: SessionsService,
    public router: Router,
    public authService: AuthService,
    public activeRoute: ActivatedRoute
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {},
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.BAD_REQUEST) {
            this.loader.error('Bad Request');
          }
          if (error.status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
            this.loader.error(
              'Internal server error please try again after sometimes'
            );
          }
          if (error.status === HttpStatusCode.NOT_FOUND) {
            this.loader.error('Not found');
          }
          if (error.status === HttpStatusCode.BAD_GATEWAY) {
            this.loader.error(
              'Bad Gateway The server is down or not responding'
            );
          }
        },
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.UNKOWN_ERROR) {
          const unknownError = {
            error: {
              message: AppErrorsEnum.UNKNOWN_ERROR,
            },
            message: AppErrorsEnum.UNKNOWN_ERROR,
            status: 'error',
            statusCode: 0,
          };
          this.loader.error(unknownError.message);
          return throwError(() => unknownError);
        }
        if (error.status === HttpStatusCode.UNAUTHORIZED) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      // excuteing token refreshing part
      this.isRefreshing = true;
      // below line block the other request
      this.refreshTokenSubject.next(null);

      const accessToken = this.sessionService.getAccesToken();
      const refreshToken = this.sessionService.getRefreshToken();
      const tokens = { accessToken, refreshToken };
      return this.authService.exchangeRefreshToken(tokens).pipe(
        switchMap((token: any) => {
          console.log('Success refresh toekn');
          if (token.code !== ApiStatusCode.OK) {
            this.sessionService.clearAllData();
            this.loader.error('Your session is timeout');
            // window.location.href = this.enviroment.ssoBaseUrl;
            this.router.navigateByUrl('/login');
            return throwError(() => 'Session Timeout');
          }
          if (token.code == ApiStatusCode.OK) {
            console.log('Success refresh toekn', token);
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.data.accessToken); // get new token call the apies
            this.sessionService.setAccessToken(token.data.accessToken);
            return next.handle(this.addToken(request, token.data.accessToken));
          }
          // Return an observable for other cases, or handle them accordingly
          return throwError(() => 'Unexpected Response');
        })
      );
    } else {
      // this part put all the other request to block while refreshToken generation
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null), // filter methods block other request until get the token
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'x-access-token': token,
      },
    });
  }

  ngOnDestroy(): void {
    this.destory$.next(null);
    this.destory$.complete();
  }
}
