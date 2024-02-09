import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { SessionsService } from 'src/app/core/service/session/sessions.service';
import { ToastrServiceClass } from 'src/app/core/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MustMatch } from 'src/app/shared/validators/passwordValidation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  valCheck: string[] = ['remember'];

  password!: string;
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  resetForm!: FormGroup;
  isSubmit: any = false;
  public resetPasswordID: string;
  public resetPasswordFlag = false;
  public enterEmailIDFlag = true;
  public enterOTPFlag = false;
  public passwordPattern: any;
  public isLoginOTP: boolean = false;
  public otpSubmitEnable: boolean = false;
  public destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder,
    public router: Router,
    public toastr: ToastrServiceClass,
    public activeRoute: ActivatedRoute,
    public authService: AuthService,
    public sessionService: SessionsService
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params && params.isLogin) {
          this.isLoginOTP = true;
          this.enterEmailIDFlag = false;
          this.enterOTPFlag = true;
        }
      });
    this.generateEmailForm();
    this.generateOtpForm();
    this.generateResetForm();
  }

  generateEmailForm() {
    const EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.emailForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    });
  }

  generateOtpForm() {
    const OTP_REGEX = /^[0-9]{6,6}$/;
    this.otpForm = this.fb.group({
      otpNumber: ['', [Validators.required, Validators.pattern(OTP_REGEX)]],
    });
  }

  public generateResetForm() {
    this.passwordPattern =
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
    this.resetForm = this.fb.group(
      {
        password: [
          null,
          [Validators.required, Validators.pattern(this.passwordPattern)],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  onEmailIDSubmit() {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.valid) {
      this.authService
        .forgotPassword(this.emailForm.value.username, 'forgot')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          if (data !== undefined && data !== '' && data.successCode === 1) {
            this.enterEmailIDFlag = false;
            this.enterOTPFlag = true;
            this.toastr.success(data.successMessage);
            this.sessionService.setLocalStorageKeyAndValue(
              'userEmail',
              this.emailForm.value.username
            );
          } else if (data.successCode === 0) {
            this.toastr.error(data.errorMessage);
          }
        });
    }
  }

  resendOTP() {
    let email = this.sessionService.getLocalStorageKey('userEmail');
    if (email) {
      this.authService
        .forgotPassword(email, this.isLoginOTP ? 'resend' : 'forgot')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          if (data !== undefined && data !== '' && data.successCode === 1) {
            this.toastr.success(data.successMessage);
          } else if (data.successCode === 0) {
            this.toastr.error(data.errorMessage);
          }
        });
    }
  }

  onOTPSubmit() {
    this.otpForm.markAllAsTouched();
    if (this.otpForm.valid) {
      this.authService
        .validateOTP(
          this.otpForm.value.otpNumber,
          this.isLoginOTP ? 'login' : 'forgotpassowrd'
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          if (data !== undefined && data !== '' && data.successCode === 1) {
            if (!this.isLoginOTP) {
              this.toastr.success(data.successMessage);
              this.resetPasswordID = data.refreshToken;
              this.enterEmailIDFlag = false;
              this.enterOTPFlag = false;
              this.resetPasswordFlag = true;
            } else {
              this.sessionService.clearSesstionBasedOnKey('userEmail');
              this.sessionService.setLocalStorageKeyAndValue(
                'login-success',
                true
              );
              this.sessionService.setAccessToken(data.accessToken);
              this.sessionService.setRefreshToken(data.refreshToken);
              this.sessionService.setLocalStorageKeyAndValue(
                'userId',
                data.userInfo.userID
              );
              this.sessionService.setStorage(data);
            }
          } else if (data.successCode === 0) {
            this.toastr.error(data.errorMessage);
          }
        });
    }
  }

  onChangedPasswordSubmit() {
    this.resetForm.markAllAsTouched();
    let email = this.sessionService.getLocalStorageKey('userEmail');
    if (this.resetForm.valid) {
      let request = {
        uniqueID: this.resetPasswordID,
        emailID: email,
        password: this.resetForm.value.password,
      };
      this.authService
        .resetPassword(request)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          if (data !== undefined && data !== '' && data.successCode === 1) {
            this.sessionService.setLocalStorageKeyAndValue(
              'password-reset-success',
              true
            );
            this.enterEmailIDFlag = false;
            this.enterOTPFlag = false;
            this.resetPasswordFlag = false;
            this.router.navigateByUrl('/login');
          } else if (data.successCode === 0) {
            this.toastr.error(data.errorMessage);
          }
        });
    }
  }

  checkLength() {
    if (this.otpForm.value.otpNumber.length === 6) {
      this.otpSubmitEnable = true;
    } else {
      this.otpSubmitEnable = false;
    }
  }

  onlyNumber(evt: any): boolean {
    evt = evt ? evt : '';
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
