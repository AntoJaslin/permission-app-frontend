import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { ToastrServiceClass } from 'src/app/core/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SessionsService } from 'src/app/core/service/session/sessions.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private destory$: Subject<number> = new Subject<number>();
  password!: string;
  loginForm!: FormGroup;
  isSubmit: any = false;
  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    public toastr: ToastrServiceClass,
    public sessionService: SessionsService,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    const EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const request = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService
        .loginUser(request)
        .pipe(takeUntil(this.destory$))
        .subscribe((data: any) => {
          this.sessionService.setAccessToken(data.data.accessToken);
          this.sessionService.setRefreshToken(data.data.refreshToken);
          this.sessionService.setPermissions(data.data.permissions);
          this.sessionService.setStorage(data.data);
          this.toastr.success(data.message);
          this.router.navigate(['/dashboard']);
        });
    }
  }

  ngOnDestroy(): void {
    this.destory$.next(null);
    this.destory$.complete();
  }
}
