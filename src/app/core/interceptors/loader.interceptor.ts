import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { ToastrServiceClass } from '../service/toastr.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader:ToastrServiceClass) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.headers.has('hide-loader') || request.headers.has('devicetype')){
    }else{
      this.loader.loaderShow();
    }
    
    const newReq = request.clone({
      headers: request.headers.delete('hide-loader'),
    });

    return next.handle(newReq).pipe(
      finalize(() => {
        if(request.headers.has('hide-loader') || request.headers.has('devicetype')){
        }else{
          this.loader.loaderHide();
        }
      })
    );
  }
}
