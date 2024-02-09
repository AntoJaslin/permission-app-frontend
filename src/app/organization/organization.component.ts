import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DocTableComponent } from '../shared/components/doc-table/doc-table.component';
import { OrganizationsService } from '../core/service/organization.service';
import { debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent {
  tableData: any[] = [];
  columnNames: any[] = [];
  searchNameControler = new FormControl();
  @ViewChild(DocTableComponent) docTableComponent: DocTableComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private organizationsService: OrganizationsService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.columnNames = [
      { field: 'organization_name', header: 'Name', columFilterType: 'text' },
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
        field: 'location',
        header: 'Location',
        columFilterType: 'text',
      },
      {
        field: 'size',
        header: 'Size',
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
    this.organizationsService.getAllOrganizations().subscribe((response) => {
      console.log('Response: ', response);
      this.tableData = response?.data;
      this.cdr.markForCheck();
    });
  }
}
