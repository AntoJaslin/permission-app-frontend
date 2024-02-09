import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, NoAuthGuard } from './core/guards';
import { AppLayoutComponent } from './layout/app-layout/app.layout.component';
import { PermissionsGuard } from './core/guards/permission.guard';
import { LoginComponent } from './auth/login/login.component';
import { Permission } from './core/constants/app.permission.enum';
import { NoAccessComponent } from './no-access/no-access.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        pathMatch: 'full',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'organization',
        canActivate: [AuthGuard],
        pathMatch: 'full',
        loadChildren: () =>
          import('./organization/organization.module').then(
            (m) => m.OrganizationModule
          ),
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        pathMatch: 'full',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'no-access',
    component: NoAccessComponent,
  },
  {
    path: 'notfound',
    loadChildren: () =>
      import('./notfound/notfound.module').then((m) => m.NotfoundModule),
  },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
