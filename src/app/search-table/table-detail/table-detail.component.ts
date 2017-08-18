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
  paramMap = {};

  constructor(
    private router: ActivatedRoute,
    private backendService: BackendService) {
  }

  ngOnInit() {

    this.router.params.subscribe((params: Params) => {
      this.paramMap = {
        paramMap: {
          tableId: +params.id,
          userId: JSON.parse(localStorage.user).id,
          userName: JSON.parse(localStorage.user).username,
          recordType: 'table'
        }
      };
      console.log(this.paramMap);
      this.getTblDtail(this.paramMap);
    });
  }

  getTblDtail(params): void {
    this.backendService
        .getItemsByJsonParams('tablesearch/table_detail', params)
        .then((res) => {
          this.tblDetail = res;
        });
  }

  collectTbl(tbl): void {
    let params = {
      userId: JSON.parse(localStorage.user).id,
      userName: JSON.parse(localStorage.user).name,
      collectType: 'table',
      collectValue: tbl.id
    };
    this.backendService
        .getItemsByJsonParams('collection/addCollection', params)
        .then((res) => {
          if (res === 1) {
            console.log('成功');
            this.getTblDtail(this.paramMap);
          }
        });
  }

  cancelCollect(tbl): void {
    let params = {
      userId: JSON.parse(localStorage.user).id,
      id: tbl.collModel.id
    };
    this.backendService
        .getItemsByJsonParams('collection/cancleCollection ', params)
        .then((res) => {
          if (res === 1) {
            console.log('成功');
            this.getTblDtail(this.paramMap);
          }
        });
  }

}
