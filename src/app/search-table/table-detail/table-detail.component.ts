import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'my-search-table',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit {
  pagetitle = '表详情';
  parentPath = '数据字典';
  tblDetail = {};

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getTblDtail();
  }

  getTblDtail(): void {
    this.backendService
        .getItemsByParams('tablesearch/table_detail', 'tableId=4')
        .then((res) => {
          this.tblDetail = res;
        });
  }

}
