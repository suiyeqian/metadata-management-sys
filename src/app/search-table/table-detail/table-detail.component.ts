import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
    private router: ActivatedRoute,
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
        this.getTblDtail(+params.id);
    });
  }

  getTblDtail(id): void {
    this.backendService
        .getItemsByJsonParams('tablesearch/table_detail', {tableId: id, userId: 'test'})
        .then((res) => {
          this.tblDetail = res;
        });
  }

}
