import { ChangeDetectorRef, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { SessionsService } from 'src/app/core/service/session/sessions.service';

@Directive({
  selector: '[appUserAccessDisabled]'
})
export class UserAccessDisabledDirective {

  @Input() permisstion:number | number[];

  constructor(
    private elementRef:ElementRef, 
    private renderer2:Renderer2,
    private localStorage:SessionsService,
    private cdRfc: ChangeDetectorRef
  ) { }


  ngAfterViewInit(): void {
    let allowedPermisstion:any[] = this.localStorage.permisstions() || [];
    // check permission here or not 
    const hasPermission = allowedPermisstion.some((permission:any) => {
      if (typeof this.permisstion === 'number') {
        return permission.actionID === this.permisstion;
      } 
      return true;
    });
    if(!hasPermission){
      // Optionally, you can also add a CSS class to visually indicate the disabled state
        this.renderer2.addClass(this.elementRef.nativeElement, 'disabled');
        this.cdRfc.detectChanges();
     }
  }

}
