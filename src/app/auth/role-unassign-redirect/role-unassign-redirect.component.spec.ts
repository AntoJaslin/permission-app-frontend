import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUnassignRedirectComponent } from './role-unassign-redirect.component';

describe('RoleUnassignRedirectComponent', () => {
  let component: RoleUnassignRedirectComponent;
  let fixture: ComponentFixture<RoleUnassignRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleUnassignRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleUnassignRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
