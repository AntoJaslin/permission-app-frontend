import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, NoAuthGuard } from './core/guards';
import { AppLayoutComponent } from './layout/app-layout/app.layout.component';
import { PermissionsGuard } from './core/guards/permission.guard';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { Permission } from './core/constants/app.permission.enum';
import { RoleUnassignRedirectComponent } from './auth/role-unassign-redirect/role-unassign-redirect.component';
import { NoAccessComponent } from './no-access/no-access.component';

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
    path: 'enter-otp',
    pathMatch: 'full',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  // Remove forgot password feature for LDAP integration
  // {
  //   path: 'forgot-password',
  //   pathMatch: 'full',
  //   component: ForgotPasswordComponent
  // },
  // {
  //     path: 'sso-redirect',
  //     pathMatch: 'full',
  //     component: SsoRedirectComponent
  // },
  {
    path: 'role-unassign-redirect',
    pathMatch: 'full',
    component: RoleUnassignRedirectComponent,
    canActivate: [AuthGuard],
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
