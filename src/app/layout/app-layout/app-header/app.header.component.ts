import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SessionsService } from 'src/app/core/service/session/sessions.service';
import { ProfileDetailsComponent } from 'src/app/layout/app-layout/app-header/profile-details/profile-details.component';
import { LayoutService } from '../../service/app.layout.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { formatDate } from '@angular/common';
import { ApiStatusCode } from 'src/app/core/constants/http-statuscode';
import { Subject, takeUntil, timer } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { DocConfirmDialogComponent } from 'src/app/shared/components/doc-confirm-dialog/doc-confirm-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './app.header.component.html',
  styleUrls: ['./app.header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class AppTopBarComponent implements OnInit {
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;
  @ViewChild('notificationsPanel') notificationsPanel!: OverlayPanel;
  @ViewChild('userPanel') userPanel!: OverlayPanel;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (this.notificationsPanel || this.userPanel) {
      this.notificationsPanel.hide();
      this.userPanel.hide();
    }
  }
  private destroy$: Subject<any> = new Subject<any>();
  ref!: DynamicDialogRef;
  items!: MenuItem[];
  isnotificationsPanelDisplay = false;
  notificationsList: any[] = [];
  notificationsCount: string = '0';
  notificationsNotViewed: any[] = [];
  profileItems: MenuItem[] = [];
  enviroment = environment;
  constructor(
    public layoutService: LayoutService,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public sessionService: SessionsService,
    public dialogService: DialogService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.profileItems = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public logout() {
    this.sessionService.clearAllData();
    //SSO Login disabled
    //window.location.href = this.enviroment.ssoBaseUrl;
    window.location.href = '/';
    return;
  }

  public show() {
    this.ref = this.dialogService.open(ProfileDetailsComponent, {
      data: {
        id: '#4583974fhsfs',
      },
      position: 'top-right',
      width: '614px',
      height: '360px',
      closeOnEscape: true,
      dismissableMask: true,
      showHeader: false,
      style: {
        'margin-top': '5.5rem',
        'margin-right': '4rem',
        'border-radius': '5rem !important',
      },
      styleClass: 'profile-dialog',
    });
  }

  compareDates(notificationCreatedDate) {
    let date1 = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    let date2 = formatDate(
      new Date(notificationCreatedDate),
      'yyyy-MM-dd',
      'en_US'
    );

    if (date1 === date2) {
      return true;
    } else {
      return false;
    }
  }
}
