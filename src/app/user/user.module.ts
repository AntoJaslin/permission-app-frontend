import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { PermissionsGuard } from '../core/guards/permission.guard';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ModulePermissions } from '../core/constants/app.permission.enum';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [PermissionsGuard],
    data: {
      permission: ModulePermissions.USER_MODULE,
    },
  },
];

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class UserModule {}
