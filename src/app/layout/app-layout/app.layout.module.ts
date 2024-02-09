import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuitemComponent } from '../app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppConfigModule } from '../config/config.module';
import { AppSidebarComponent } from '../app.sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { AppLayoutComponent } from './app.layout.component';
import { AppTopBarComponent } from './app-header/app.header.component';
import { AppFooterComponent } from './app-footer/app.footer.component';
import { AppMenuComponent } from './side-nav-bar/app-side-nav-bar.component';
import { ProfileDetailsComponent } from './app-header/profile-details/profile-details.component';

@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent,
    ProfileDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    AppConfigModule,
    SharedModule,
  ],
  exports: [AppLayoutComponent],
  providers: [],
})
export class AppLayoutModule {}
