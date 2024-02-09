import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { SessionsService } from 'src/app/core/service/session/sessions.service';
import { ToastrServiceClass } from 'src/app/core/service/toastr.service';
import {
  MustMatch,
  matchingPasswordsValidator,
} from 'src/app/shared/validators/passwordValidation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetForm!: FormGroup;
  dialogData: any;
  private destory$: Subject<number> = new Subject<number>();
  passwordErrorMsg: string =
    'Password should contain a minimum of 8 Alphanumeric characters with at least one Uppercase, one Lowercase and one Symbol(@,#,$,%,^,&,+,=,!)';
  showPasswordTooltip: boolean = false;
  constructor(
    private dialogConfig: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
    public fb: FormBuilder,
    public sessionService: SessionsService,
    public toastr: ToastrServiceClass
  ) {
    this.buildStatusForm();
  }

  ngOnInit() {
    this.dialogData = this.dialogConfig.header;
  }

  buildStatusForm() {
    const passwordPattern =
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
    this.resetForm = this.fb.group(
      {
        oldPassword: [null, [Validators.required]],
        newPassword: [
          null,
          [Validators.required, Validators.pattern(passwordPattern)],
        ],
        conformPassword: [null, [Validators.required]],
      },
      {
        validator: [
          MustMatch('newPassword', 'conformPassword'),
          matchingPasswordsValidator(),
        ],
      }
    );
  }

  onCancel() {
    this.resetForm.reset();
  }

  onConfirm() {
    if (this.resetForm.valid) {
      let userDetails: any =
        this.sessionService.getLocalStorageKey('currentUser');
      const updatePsw = {
        siteID: userDetails.userInfo.siteID,
        userID: userDetails.userInfo.userID,
        newPassword: this.resetForm.value.newPassword,
        oldPassword: this.resetForm.value.oldPassword,
      };
      // this.adminService
      //   .updateResetPassword(updatePsw)
      //   .pipe(takeUntil(this.destory$))
      //   .subscribe((res: any) => {
      //     if (res.successCode) {
      //       this.toastr.success(res.successMessage);
      //       this.dialogRef.close();
      //     } else {
      //       this.toastr.error(res.errorMessage);
      //     }
      //   });
    }
  }
  ngOnDestroy(): void {
    this.destory$.next(null);
    this.destory$.complete();
  }
}
