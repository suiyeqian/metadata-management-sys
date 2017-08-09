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
  searchModel = {};
  options = [];
  advancedOps = [];
  indexResult = {};
  currentPage = 1;
  pageNums = [];
  sorts = [
    {orderBy: 'tbl_en_nm', desc: '指标名', sortType: 'asc', isActive: false},
    {orderBy: 'tbl_owner_name', desc: '负责人', sortType: 'asc', isActive: false}
  ];

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getMenucodes();
    this.getIndex();
  }

  getMenucodes(): void {
    this.backendService
        .getItemsByJsonParams('menucde/get_cde', {menuId: 8})
        .then((res) => {
          for (let value of res){
            value.selResult = [];
            value.selMore = false;
            value.ifSingle = false;
            this.options.push(value);
          }
        });
  }

  getIndex(): void {
    this.backendService
        .getItemsByJsonParams('indexSearch/search', {pageModel: {'currentPage': 1, 'pageSize': 10}, companyName: ['在线']})
        .then((res) => {
          this.indexResult = res;
          console.log(res);
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

  getPageNums(totalPage, displayNum = 7): void {
    let initNums = [];
    for ( let i = 1; i <= (totalPage > displayNum ? displayNum : totalPage); i++) {
      initNums.push(i);
    }
    if ( totalPage < displayNum ) {
      this.pageNums = initNums;
      return;
    }
    if ( this.currentPage < 4 ) {
      this.pageNums = initNums;
    } else if ( totalPage - this.currentPage < 4 ) {
      this.pageNums = initNums.map((i) => totalPage - i + 1).reverse();
    } else {
      this.pageNums = initNums.map((i) => this.currentPage + 4 - i ).reverse();
    }
  }

}
