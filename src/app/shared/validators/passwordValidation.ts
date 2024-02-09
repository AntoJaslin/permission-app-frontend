import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}

export function matchingPasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPassword = control.get('newPassword');
      const oldPassword = control.get('oldPassword');
  
      if (newPassword && oldPassword &&
        newPassword.value !== null && newPassword.value !== undefined && newPassword.value !== '' &&
        oldPassword.value !== null && oldPassword.value !== undefined && oldPassword.value !== '' &&
        newPassword.value === oldPassword.value) {
      return { matchingPasswords: true };
    }
  
      return null;
    };
  }
