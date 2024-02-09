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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  private destory$: Subject<number> = new Subject<number>();
  signupForm!: FormGroup;
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
    const PHONE_REGEX = /^(\d{10})$/;
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      phone: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      const request = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        phone: this.signupForm.value.phone,
        password: this.signupForm.value.password,
      };
      this.authService
        .signupUser(request)
        .pipe(takeUntil(this.destory$))
        .subscribe((data: any) => {
          this.toastr.success(data.message);
          this.router.navigate(['/login']);
        });
    }
  }

  ngOnDestroy(): void {
    this.destory$.next(null);
    this.destory$.complete();
  }
}
