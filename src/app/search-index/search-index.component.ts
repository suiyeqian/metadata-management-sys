import { Component, OnInit } from '@angular/core';

import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'my-search-index',
  templateUrl: './search-index.component.html',
  styleUrls: ['./search-index.component.scss']
})
export class SearchIndexComponent implements OnInit {
  pagetitle = '指标搜索';
  parentPath = '指标体系';
  private menucodeUrl = 'menucde/get_cde';
  private searchTableUrl = 'tablesearch/search';
  searchModel = {};
  options = [];
  advancedOps = [];
  tblResult = {};
  currentPage = 1;
  pageNums = [];
  sorts = [
    {orderBy: 'tbl_en_nm', desc: '表名', sortType: 'asc', isActive: false},
    {orderBy: 'tbl_owner_name', desc: '负责人', sortType: 'asc', isActive: false},
    {orderBy: 'ddl_update_time', desc: '更新时间', sortType: 'desc', isActive: true}
  ];

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getMenucodes();
    this.getTables();
  }

  getMenucodes(): void {
    this.backendService
        .getItemsByJsonParams(this.menucodeUrl, {menuId: 8})
        .then((res) => {
          for (let value of res){
            value.selResult = [];
            if (value.isOption === '0') {
              value.selMore = false;
              value.ifSingle = false;
              this.options.push(value);
            } else {
              value.selMore = true;
              // 不显示表形态
              if (value.parmName !== 'Tbl_Type') {
                this.advancedOps.push(value);
              }
            }
          }
        });
  }

  getTables(): void {
    this.backendService
        .getItemsByJsonParams(this.searchTableUrl, {currentPage: 1, pageSize: 20})
        .then((res) => {
          this.tblResult = res;
          this.getPageNums(res.totalPage);
        });
  }

  select(selOpt, item): void {
    let curIndex = selOpt.selResult.indexOf(item.cdeValue);
    if (!selOpt.selMore) {
      if (selOpt.selResult.length > 1) {
        return;
      }
      if (curIndex !== -1) {
        selOpt.selResult.splice(curIndex, 1);
      } else {
        selOpt.selResult[0] = item.cdeValue;
      }
      selOpt.ifSingle = selOpt.selResult.length ? true : false;
    } else {
      if ( curIndex !== -1) {
        selOpt.selResult.splice(curIndex, 1);
      } else {
        selOpt.selResult.push(item.cdeValue);
      }
    }
  }

  getPageNums(totalPage): void {
    if ( totalPage < 7 ) {
      for ( let i = 1; i <= totalPage; i++) {
        this.pageNums.push(i);
      }
      return;
    }
    let initNums = [1, 2, 3, 4, 5, 6, 7];
    if ( this.currentPage < 4 ) {
      this.pageNums = initNums;
    } else if ( totalPage - this.currentPage < 4 ) {
      this.pageNums = initNums.map((i) => totalPage - i + 1).reverse();
    } else {
      this.pageNums = initNums.map((i) => this.currentPage + 4 - i ).reverse();
    }
  }

}
