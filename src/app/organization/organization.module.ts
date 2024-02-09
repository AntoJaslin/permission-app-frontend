import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { PermissionsGuard } from '../core/guards/permission.guard';
import { RouterModule, Routes } from '@angular/router';
import { ModulePermissions } from '../core/constants/app.permission.enum';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    canActivate: [PermissionsGuard],
    data: {
      permission: ModulePermissions.ORGANIZATION_MODULE,
    },
  },
];

@NgModule({
  declarations: [OrganizationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class OrganizationModule {}
