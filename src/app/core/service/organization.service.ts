import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionsService } from './session/sessions.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  BASE_URL: string = environment.baseUrl;
  public userInfo: any;

  constructor(
    private http: HttpClient,
    private sessionService: SessionsService
  ) {}

  getAllOrganizations() {
    return this.http.get<any>(this.BASE_URL + 'organization/getAll');
  }
}
