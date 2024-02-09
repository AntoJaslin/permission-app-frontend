import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ResetPasswordComponent } from 'src/app/auth/reset-password/reset-password.component';
import { SessionsService } from 'src/app/core/service/session/sessions.service';
import { ToastrServiceClass } from 'src/app/core/service/toastr.service';
import { DocConfirmDialogComponent } from 'src/app/shared/components/doc-confirm-dialog/doc-confirm-dialog.component';
//import { DocConfirmDialogComponent } from 'src/app/shared/components/doc-confirm-dialog/doc-confirm-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  userInfo: any;
  display = false;
  userForm!: FormGroup;
  dialogRef!: DynamicDialogRef;
  private destory$: Subject<number> = new Subject<number>();
  constructor(
    public config: DynamicDialogConfig,
    public sessionService: SessionsService,
    public fb: FormBuilder,
    public toastr: ToastrServiceClass,
    public dialogService: DialogService,
    private cdf: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    const currentUser: any =
      this.sessionService.getLocalStorageKey('currentUser');
    this.userInfo = {
      userName: currentUser.user.name,
      emailID: currentUser.user.email,
    };
  }

  // onDeleteStatus() {
  //   this.dialogRef = this.dialogService.open(DocConfirmDialogComponent, {
  //     data: {
  //       message: `Do you want to update Account Name?`,
  //       formStatus: true,
  //       userName: this.userInfo.userName,
  //     },
  //     position: 'center',
  //     width: '535px',
  //     height: 'auto',
  //     closeOnEscape: true,
  //     dismissableMask: true,
  //     showHeader: true,
  //   });
  //   this.dialogRef.onClose.subscribe((data: any) => {
  //     if (data) {
  //       let userDetails: any =
  //         this.sessionService.getLocalStorageKey('currentUser');
  //       const request = {
  //         siteID: userDetails.userInfo.siteID,
  //         userID: userDetails.userInfo.userID,
  //         userName: data.data.userName,
  //         roleId: userDetails.roleInfo[0].roleID,
  //         emailId: userDetails.userInfo.emailID,
  //       };
  //       // this.adminService.updateUserName(request).subscribe((res: any) => {
  //       //   if (res.successCode === 1) {
  //       //     this.toastr.success(res.successMessage);
  //       //     userDetails.userInfo.userName = data.data.userName;
  //       //     this.sessionService.setLocalStorageKeyAndValue(
  //       //       'currentUser',
  //       //       userDetails
  //       //     );
  //       //     let userData: any =
  //       //       this.sessionService.getLocalStorageKey('currentUser');
  //       //     this.userInfo = {
  //       //       userName: userData.userInfo.userName,
  //       //       emailID: userData.userInfo.emailID,
  //       //       roleName: userData?.roleInfo[0]?.roleName,
  //       //     };
  //       //     this.cdf.markForCheck();
  //       //   } else if (res.successCode === 0) {
  //       //     this.toastr.error(res.errorMessage);
  //       //   }
  //       // });
  //     }
  //   });
  // }

  public onLogoutClick() {
    this.dialogRef = this.dialogService.open(DocConfirmDialogComponent, {
      data: {
        message: 'Are you sure want to logout?',
        isLogoutDialog: true,
      },
      position: 'center',
      width: '535px',
      height: 'auto',
      closeOnEscape: true,
      dismissableMask: true,
      showHeader: true,
    });
    this.dialogRef.onClose.subscribe((data: any) => {
      if (data === 'confirm') {
        this.logout();
      }
    });
  }

  public logout() {
    this.sessionService.clearAllData();
    //SSO Login disabled
    //window.location.href = this.enviroment.ssoBaseUrl;
    window.location.href = '/';
    return;
  }

  resetPassword() {
    this.dialogRef = this.dialogService.open(ResetPasswordComponent, {
      header: `Reset Password`,
      position: 'center',
      width: '450px',
      height: 'auto',
      closeOnEscape: true,
      dismissableMask: true,
      showHeader: true,
    });

    this.dialogRef.onClose.subscribe();
  }

  ngOnDestroy(): void {
    this.destory$.next(null);
    this.destory$.complete();
  }
}
