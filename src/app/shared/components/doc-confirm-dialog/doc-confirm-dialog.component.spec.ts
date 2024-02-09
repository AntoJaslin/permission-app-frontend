import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocConfirmDialogComponent } from './doc-confirm-dialog.component';

describe('DocConfirmDialogComponent', () => {
  let component: DocConfirmDialogComponent;
  let fixture: ComponentFixture<DocConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
