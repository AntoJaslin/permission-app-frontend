import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoadingScreenService } from '../../shared/components/loading-screen/loading-screen.service';
import { SessionsService } from './session/sessions.service';
import { AppErrorsEnum } from '../constants/app-errors.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastrServiceClass {
  public closeButton = true;
  private requestCount = 0;

  constructor(
    private messageService: MessageService,
    private loader: LoadingScreenService,
    private sessionService: SessionsService
  ) {}

  info(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }
  success(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  warning(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: message,
    });
  }
  error(message: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
  loaderShow(message?: string) {
    this.requestCount++;
    const text = message != '' ? message : '';
    if (this.requestCount === 1) {
      this.loader.startLoading(text);
    }
  }

  successToastWithTime(message: string, timing: number) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: timing,
    });
  }
  errorToastWithTime(message: string, timing: number) {
    this.messageService.add({
      severity: 'error',
      summary: 'Success',
      detail: message,
      life: timing,
    });
  }

  loaderHide() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.loader.stopLoading();
    }
  }

  showLoginSuccessToast() {
    if (this.sessionService.getLocalStorageKey('login-success')) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: AppErrorsEnum.LOGIN_SUCCESS,
      });
      this.sessionService.clearSesstionBasedOnKey('login-success');
    }
  }
  passwordResetSuccessToast(message: string) {
    if (this.sessionService.getLocalStorageKey('password-reset-success')) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: message,
      });
      this.sessionService.clearSesstionBasedOnKey('password-reset-success');
    }
  }
}
