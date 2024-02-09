import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Helper } from 'src/app/classes/helper';

@Component({
  selector: 'app-doc-confirm-dialog',
  templateUrl: './doc-confirm-dialog.component.html',
  styleUrls: ['./doc-confirm-dialog.component.scss'],
})
export class DocConfirmDialogComponent {
  userForm!: FormGroup;
  dialogData: any;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dialogData = this.dialogConfig.data;
    if (this.dialogData?.formStatus) {
      this.buildStatusForm();
      this.userForm.patchValue({ userName: this.dialogData.userName });
    }
  }

  onConfirm() {
    if (this.dialogData?.formStatus) {
      if (this.userForm.valid) {
        this.dialogRef.close({ data: this.userForm.value });
      }
    } else {
      this.dialogRef.close('confirm');
    }
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

  buildStatusForm() {
    this.userForm = this.fb.group({
      userName: [null, [Validators.required, Helper.validateTheInput]],
    });
  }
}
