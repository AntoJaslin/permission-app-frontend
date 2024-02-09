import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// third modules
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PickListModule } from 'primeng/picklist';
import { ListboxModule } from 'primeng/listbox';
import { DragDropModule } from 'primeng/dragdrop';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { OrderListModule } from 'primeng/orderlist';
import { TabMenuModule } from 'primeng/tabmenu';

// components
import { DocTableComponent } from './components/doc-table/doc-table.component';
import { ChangeBackgroundDirective } from './directives/change-background.directive';

// directives
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { UseraccesspermissionDirective } from './directives/useraccesspermission.directive';
import { NumbersandtextDirective } from './directives/numbersandtext.directive';

// pipes
import { FilterArrayObjectsPipe } from './pipes/filter-array-objects.pipe';
import { ArrayToObjectPipe } from './pipes/array-to-object.pipe';
import { DashIfEmptyPipe } from './pipes/dash-if-empty.pipe';

// service
import { UserAccessDisabledDirective } from './directives/user-access-disabled.directive';
import { UsernamePipe } from './pipes/username.pipe';
import { DocConfirmDialogComponent } from './components/doc-confirm-dialog/doc-confirm-dialog.component';

const THIRD_MODULES = [
  TabViewModule,
  TimelineModule,
  SplitButtonModule,
  ProgressSpinnerModule,
  ToastModule,
  ButtonModule,
  CheckboxModule,
  PasswordModule,
  InputTextModule,
  MessagesModule,
  MessageModule,
  OverlayPanelModule,
  TableModule,
  ToggleButtonModule,
  RippleModule,
  MultiSelectModule,
  DropdownModule,
  ProgressBarModule,
  SliderModule,
  RatingModule,
  DialogModule,
  BreadcrumbModule,
  PickListModule,
  ListboxModule,
  DragDropModule,
  AvatarModule,
  CalendarModule,
  TagModule,
  InputTextareaModule,
  DividerModule,
  AccordionModule,
  PanelModule,
  BadgeModule,
  PaginatorModule,
  RadioButtonModule,
  OrderListModule,
  TabMenuModule,
];
const COMPONENTS = [DocTableComponent, DocConfirmDialogComponent];

const PIPES = [
  ArrayToObjectPipe,
  FilterArrayObjectsPipe,
  DashIfEmptyPipe,
  UsernamePipe,
];
const DIRECTIVES = [
  NumbersOnlyDirective,
  UseraccesspermissionDirective,
  NumbersandtextDirective,
  ChangeBackgroundDirective,
  UserAccessDisabledDirective,
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...THIRD_MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...THIRD_MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ],
  providers: [
    DialogService,
    CurrencyPipe,
    DatePipe,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
})
export class SharedModule {}
