import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BackendService } from '../../../core/services/backend.service';

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
  alertShow = false;
  alertMsg: string;
  alertType = 'success';
  private timeId;

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
      // console.log(this.paramMap);
      this.getTblDtail(this.paramMap);
    });
  }

  getTblDtail(params): void {
    this.backendService
        .getItemsByJsonParams('tablesearch/table_detail', params)
        .then((res) => {
          res.isPartitionTbl = res.isPartitionTbl === 'N' ? '否' : '是';
          this.tblDetail = res;
        });
  }

  collectTbl(tbl): void {
    this.alertShow = false;
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    let params = {
      userId: JSON.parse(localStorage.user).id,
      userName: JSON.parse(localStorage.user).username,
      collectType: 'table',
      collectValue: tbl.id
    };
    this.backendService
        .getItemsByJsonParams('collection/addCollection', params)
        .then((res) => {
          if (res === 1) {
            this.alertMsg = '收藏成功!';
            this.alertType = 'success';
            this.getTblDtail(this.paramMap);
          } else {
            this.alertMsg = '收藏失败，请稍后重试!';
            this.alertType = 'danger';
          }
          this.alertShow = true;
          this.timeId = setTimeout(() => this.alertShow = false, 1500);
        });
  }

  cancelCollect(tbl): void {
    this.alertShow = false;
    if (this.timeId) {
      clearTimeout(this.timeId);
    }
    let params = {
      userId: JSON.parse(localStorage.user).id,
      id: tbl.collModel.id
    };
    this.backendService
        .getItemsByJsonParams('collection/cancleCollection ', params)
        .then((res) => {
          if (res === 1) {
            this.alertMsg = '取消收藏成功!';
            this.alertType = 'warning';
            this.getTblDtail(this.paramMap);
          } else {
            this.alertMsg = '取消收藏失败，请稍后重试!';
            this.alertType = 'danger';
          }
          this.alertShow = true;
          this.timeId = setTimeout(() => this.alertShow = false, 1500);
        });
  }

}
