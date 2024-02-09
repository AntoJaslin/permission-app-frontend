import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionsService } from '../session/sessions.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  BASE_URL: string = environment.baseUrl;
  public userInfo: any;

  constructor(
    private http: HttpClient,
    private sessionService: SessionsService
  ) {}
}
