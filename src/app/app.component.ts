import { Component, HostListener, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SessionsService } from './core/service/session/sessions.service';
import { AuthService } from './core/service/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'at_docmatic';
  constructor(
    private primengConfig: PrimeNGConfig,
    private layoutService: LayoutService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    private location: Location,
    public localStorage: SessionsService,
    public authService: AuthService
  ) {}
  enviroment = environment.baseUrl;
  ngOnInit() {
    this.primengConfig.ripple = true;

    //optional configuration with the default configuration
    this.layoutService.config = {
      ripple: false, //toggles ripple on and off
      inputStyle: 'outlined', //default style for input elements
      menuMode: 'static', //layout mode of the menu, valid values are "static" and "overlay"
      colorScheme: 'light', //color scheme of the template, valid values are "light" and "dark"
      theme: 'mdc-light-deeppurple', //default component theme for PrimeNG
      scale: 14, //size of the body font size to scale the whole application
    };
  }
}
