import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app-layout/app.layout.module';
import { AuthService } from './core/service/auth/auth.service';
import { EventService } from './core/service/event.service';
import { IconService } from './core/service/icon.service';
import { NodeService } from './core/service/node.service';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  TokenInterceptor,
  LoaderInterceptor,
  ErrorHandlerInterceptor,
} from './core/interceptors';
import { ServiceConfigs } from './core/serviceconfig';
import { ToastrServiceClass } from './core/service/toastr.service';
import { MessageService } from 'primeng/api';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { TableService } from 'primeng/table';
import { LoginComponent } from './auth/login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    LoginComponent,
    SignupComponent,
    NoAccessComponent,
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ConfirmationService,
    TableService,
    EventService,
    IconService,
    NodeService,
    AuthService,
    ServiceConfigs,
    ToastrServiceClass,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
