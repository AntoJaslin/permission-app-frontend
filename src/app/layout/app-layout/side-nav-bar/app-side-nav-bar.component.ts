import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { ModulePermissions } from 'src/app/core/constants/app.permission.enum';
@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './app-side-nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMenuComponent {
  sidenavPermission = ModulePermissions;

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {}
}
