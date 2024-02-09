import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, EventEmitter, ContentChild, TemplateRef, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked, OnChanges, SimpleChanges} from '@angular/core';
import { SortEvent, SelectItem, FilterMetadata } from 'primeng/api';
import { TableService } from 'primeng/table';
import { Table } from 'primeng/table';
import { BehaviorSubject, Subject } from 'rxjs';


export function tableFactory(tableComponent: DocTableComponent) {
  return tableComponent.table;
}

@Component({
  selector: 'doc-table',
  templateUrl: './doc-table.component.html',
  styleUrls: ['./doc-table.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  providers:[
    TableService,
    {
      provide:Table,
      useFactory:tableFactory,
      deps:[DocTableComponent]
    }
  ]
})
export class DocTableComponent implements OnInit {
  @Input() data!: any[];
  @Input() columns!: any[];
  @Input() rowHover: boolean = false;
  @Input() paginator: boolean = false;
  @Input() loading: boolean = false;
  @Input() totalRecords!: any;
  @Input() rowsPerPageOptions!:number[]; 
  @Input() globalFilterFields!:string[];
  @Input() showCurrentPageReport:boolean = false;
  @Input() displayRowsPerPage:number = 10;
  @Input() headerTemplate:any;
  @Input() toggleColumn:any;
  @Input() bodyTemplate:any;
  @Input() captionTemplate:any;
  @Input() customSort:boolean = false;
  @Input() scrollableTable:boolean = true;
  @Input() dataKey:string;
  @Input() noDataFound:string;
  @Input() enableReorderColumns: boolean = false;
  @Input() tableInDialog: boolean = false;
  @Input() pageLinks: any;
  @Input() lazy: boolean = false;
  @Input() first: number = 0;
  @Output() deleteRowEmitter = new EventEmitter<any>();
  @Output() editRowEmitter = new EventEmitter<any>();
  @Output() selectedTableValues = new EventEmitter<any>();
  @Output() showHideClearBtn = new EventEmitter<boolean>(false);
  @Output() onPage = new EventEmitter<any>();
  @Output() onLazyLoad = new EventEmitter<any>();
  @Output() onFilter = new EventEmitter<any>();

  dynamicColumns!: any[];
  selectedProducts:any[] = [];
  filterredvalue:any[]=[];
  
  @ViewChild('dt',{ static:true }) table: Table;

  // dynamically show the header and body data in table
  @ContentChild('headerTemplate') headerTemplates:any;
  @ContentChild('bodyTemplate') bodyTemplates:any;
  @ContentChild('captionTemplate') captionTemplates:any;


  constructor(private cdRfc:ChangeDetectorRef){
  }

  // customise column 
  @Input() get dynamicTableColumns():any[]{
    return this.columns;
  }

  set dynamicTableColumns(val:any[]){}

  ngOnInit() {
    this.dynamicColumns = this.columns.map(col => ({ field: col.field, header: col.header }));
    this.cdRfc.detectChanges();
  };


  deleteRow(value:any){
    this.deleteRowEmitter.emit(value);
  };
  editRow(value:any){
    this.editRowEmitter.emit(value)
  };
  // checkbox data 
  onSelectionChange(e:any){
    this.selectedTableValues.emit(e);
  }
  onRowSelect(event:any) { }

  customSortFn(event: SortEvent) {
    if(event.data){
      event.data.sort((data1:any, data2:any) => {
          return 0;
    
      });
    }
  };

  // hide the clear button 

   clearTableFilters(){
    this.table.clear();
    this.showHideClearBtn.emit(false);
  };

  // show the clear button 

  filterTable(value:Table){
    // this.filterredvalue capture the table values while changed 
    this.filterredvalue = value.filteredValue
    let filters =  value.filters;
    for(const key in filters){
      if(filters[key]?.[0]?.value){
        this.showHideClearBtn.emit(true);
      }
    }
  };
  
  // filter table values while searching
  filterTableValue(value:string){
    if(value === null || value === undefined || value === ''){
      this.showHideClearBtn.emit(false);
      return this.table.filterGlobal(value,'contains')
    }else{
      this.showHideClearBtn.emit(true);
      return this.table.filterGlobal(value,'contains')
    }
  }
  onPageChange(event: any) {
    this.onPage.emit(event);
  }
  onTableFilter(event: any) {
    this.onFilter.emit(event);
  }
  onLoadData(event) {}
}
