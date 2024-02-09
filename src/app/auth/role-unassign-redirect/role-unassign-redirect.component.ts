import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SessionsService } from 'src/app/core/service/session/sessions.service';

@Component({
  selector: 'app-role-unassign-redirect',
  templateUrl: './role-unassign-redirect.component.html',
  styleUrls: ['./role-unassign-redirect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleUnassignRedirectComponent {
  private unsubscriber : Subject<void> = new Subject<void>();
  
  constructor(
    private sessionService: SessionsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.sessionService.clearAllData();
    this.router.navigate(['/login'])
  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}