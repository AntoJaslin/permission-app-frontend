import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NotfoundRoutingModule } from './notfound-routing.module';
import { NotfoundComponent } from './notfound.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NotfoundRoutingModule,
        SharedModule,
    ],
    declarations: [NotfoundComponent]
})
export class NotfoundModule { }
