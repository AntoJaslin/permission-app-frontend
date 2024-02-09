import { Injectable, EventEmitter, Output, Directive } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  @Output() refreshPrfileImage: EventEmitter<boolean> = new EventEmitter();
  @Output() refreshProductCounts: EventEmitter<boolean> = new EventEmitter();

  public setStorage(data: any) {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  public setPermissions(data: any) {
    localStorage.setItem('currentUserPermissions', JSON.stringify(data));
  }

  public getStorage() {
    return localStorage.getItem('currentUser');
  }

  public getPermissions() {
    return localStorage.getItem('currentUserPermissions');
  }

  public getAuthToken(): string {
    const currentUser = this.getLocalStorageKey('currentUser');
    if (currentUser != null) {
      return currentUser['accessToken'];
    }
    return '';
  }

  public getUserId(): number {
    const currentUser = this.getLocalStorageKey('currentUser');
    if (currentUser != null) {
      return currentUser.user._id;
    }
    return 0;
  }

  public getUserEmail(): number {
    const currentUser = this.getLocalStorageKey('currentUser');
    if (currentUser != null) {
      return currentUser.user.email;
    }
    return 0;
  }

  public getRoleId(): number {
    const currentUser = this.getLocalStorageKey('currentUser');
    if (currentUser != null) {
      return currentUser['roleInfo'][0].roleID;
    }
    return 0;
  }
  public getUserMailId(): string {
    const currentUser = this.getLocalStorageKey('currentUser');
    if (currentUser != null) {
      return currentUser['email'];
    }
    return '';
  }
  public getCurrentUser(): string {
    const currentUser = this.getLocalStorageKey('currentUser');
    if (currentUser != null) {
      return currentUser;
    }
    return '';
  }
  public getUserType(): string {
    const currentUser = this.getLocalStorageKey('currentUser');
    if (currentUser != null) {
      return currentUser['roleInfo'][0]?.roleID;
    }
    return '';
  }

  public getUserInfo(): string {
    const currentUser = this.getLocalStorageKey('currentUser');
    if (currentUser != null) {
      return currentUser['userInfo'];
    }
    return '';
  }

  public clearStorge() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserPermissions');
  }

  changeProfileImage(val: any) {
    this.refreshPrfileImage.emit(val);
  }

  changeSupplierProductCounts(val: any) {
    this.refreshProductCounts.emit(val);
  }

  permisstions() {
    const currentUserPermissions = JSON.parse(this.getPermissions());
    if (currentUserPermissions != null) {
      return currentUserPermissions;
    }
  }

  setLocalStorageKeyAndValue(key: string, value) {
    if (value == undefined) {
      value = {};
    }
    let data = localStorage.setItem(key, JSON.stringify(value));
    if (value != undefined && value != null) {
      return value;
    }
    return null;
  }

  getLocalStorageKey(key: string) {
    let value = JSON.parse(localStorage.getItem(key));
    if (value != undefined && value != null) {
      return value;
    }
    return null;
  }

  clearSesstionBasedOnKey(key: string) {
    localStorage.removeItem(key);
  }

  clearAllData() {
    localStorage.clear();
  }

  getDataPermission() {
    let permissions = JSON.parse(
      localStorage.getItem('currentUserPermissions')
    );
    if (permissions) {
      return permissions.filter((data) => data.moduleName === 'Data');
    }
  }

  setAccessToken(token) {
    this.setLocalStorageKeyAndValue('accessToken', token);
  }
  setRefreshToken(token) {
    this.setLocalStorageKeyAndValue('refreshToken', token);
  }

  getAccesToken() {
    return this.getLocalStorageKey('accessToken');
  }
  getRefreshToken() {
    return this.getLocalStorageKey('refreshToken');
  }

  setValueToSession(key, value) {
    sessionStorage.setItem(key, value);
  }

  getValuetoSession(key) {
    return sessionStorage.getItem(key);
  }

  removeSession() {
    sessionStorage.clear();
  }
}
