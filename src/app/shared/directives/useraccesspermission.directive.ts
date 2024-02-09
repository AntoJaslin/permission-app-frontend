import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SessionsService } from 'src/app/core/service/session/sessions.service';

@Directive({
  selector: '[appUserAccessPermission]',
})
export class UseraccesspermissionDirective implements AfterViewInit {
  @Input() permission: string | string[];

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private sessionService: SessionsService,
    private cdRfc: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    let allowedPermisstion: any[] =
      JSON.parse(this.sessionService.getPermissions()) || [];
    // check permission here or not
    const hasPermission = allowedPermisstion.some((permission: any) => {
      // if (typeof this.permission === 'string') {

      // } else if (Array.isArray(this.permission)) {
      //   return this.permission.includes(permission.actionID);
      // }
      // return true;
      return permission.permission === this.permission;
    });

    if (!hasPermission) {
      this.renderer2.removeChild(
        this.elementRef.nativeElement.parentNode,
        this.elementRef.nativeElement
      );
      this.cdRfc.markForCheck();
    }
  }
}
