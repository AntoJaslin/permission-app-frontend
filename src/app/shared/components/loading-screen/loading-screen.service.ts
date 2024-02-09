import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  
  private _loading = false;
  private messageSource = new BehaviorSubject('Loading...');
  currentMessage = this.messageSource.asObservable();
  loadingStatus = new Subject<boolean>();

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading(msg?: string) {
    this.messageSource.next(msg!);
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
