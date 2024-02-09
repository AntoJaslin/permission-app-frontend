import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/core/service/user.service';
import { DocTableComponent } from 'src/app/shared/components/doc-table/doc-table.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  tableData: any[] = [];
  columnNames: any[] = [];
  searchNameControler = new FormControl();
  @ViewChild(DocTableComponent) docTableComponent: DocTableComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.columnNames = [
      { field: 'name', header: 'Name', columFilterType: 'text' },
      {
        field: 'email',
        header: 'Email ID',
        columFilterType: 'text',
      },
      {
        field: 'phone',
        header: 'Phone No',
        columFilterType: 'text',
      },
      {
        field: 'status',
        header: 'Status',
        columFilterType: 'text',
      },
      { field: 'icons', header: 'Action' },
    ];

    this.searchNameControler.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          this.docTableComponent.filterTableValue(searchTerm);
          return searchTerm ?? of(null);
        })
      )
      .subscribe();
  }

  getUsers() {
    this.userService
      .getAllUsers()
      .pipe(
        map((data) => {
          let icons = ['/assets/icons/edit.svg', '/assets/icons/delete.svg'];
          data.data.map((item) => (item.icons = icons));
          return data;
        })
      )
      .subscribe((response) => {
        this.tableData = response?.data;
        this.cdr.markForCheck();
      });
  }
}
