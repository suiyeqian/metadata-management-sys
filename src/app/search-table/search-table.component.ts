import { Component, OnInit } from '@angular/core';

import { BackendService } from '../shared/backend.service';
import { SearchParams } from '../shared/data-model';

@Component({
  selector: 'my-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  pagetitle = '表搜索';
  parentPath = '数据字典';
  searchTblName: string;
  options = [];
  advancedOps = [];
  tblResult = {};
  currentPage = 1;
  pageNums = [];
  sorts = [
    {orderBy: 'tbl_en_nm', desc: '表名', sortType: 'asc', isActive: true},
    {orderBy: 'tbl_owner_name', desc: '负责人', sortType: 'asc', isActive: false},
    {orderBy: 'ddl_update_time', desc: '更新时间', sortType: 'desc', isActive: false}
  ];
  advancedOpt = {};
  // isShow = false;
  private searchUrl = 'tablesearch/search';
  pageState = { isCollected: false, btnName: '收藏的表' };
  params = new SearchParams();

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getMenucodes();
    this.getTables('init');
  }

  getMenucodes(): void {
    this.backendService
        .getItemsByJsonParams('menucde/get_cde', {menuId: 7})
        .then((res) => {
          for (let value of res){
            value.selResult = [];
            value.tmpResult = [];
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

  getTables(type: string): void {
    this.setParams(type);
    console.log(this.params);
    this.backendService
        .getItemsByJsonParams(this.searchUrl, this.params)
        .then((res) => {
          this.tblResult = res;
          this.setPageNums(res.totalPage);
        });
  }

  setPageNums(totalPage, displayNum = 7): void {
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
      this.pageNums = initNums.map((i) => this.currentPage - i + 4 ).reverse();
    }
  }

  select(selOpt, item): void {
    if (!selOpt.selMore) {
      let curIndex = selOpt.selResult.indexOf(item.cdeValue);
      if (selOpt.selResult.length > 1) {
        return;
      }
      if (curIndex !== -1) {
        selOpt.selResult.splice(curIndex, 1);
      } else {
        selOpt.selResult[0] = item.cdeValue;
      }
      selOpt.ifSingle = selOpt.selResult.length ? true : false;
      this.getTables('byOption');
    } else {
      let curIndex = selOpt.tmpResult.indexOf(item.cdeValue);
      if ( curIndex !== -1) {
        selOpt.tmpResult.splice(curIndex, 1);
        // selOpt.selResult.splice(curIndex, 1);
      } else {
        selOpt.tmpResult.push(item.cdeValue);
        // selOpt.selResult.push(item.cdeValue);
      }
    }
  }

  selOk(selOpt: any): void {
    selOpt.selResult = [...selOpt.tmpResult];
    selOpt.selMore = false;
    this.getTables('byOption');
  }

  setParams(type: string): void {
    let initPageModel = { currentPage: 1, pageSize: 10};
    switch (type) {
      case 'init':
        let initParamBase = { userId: JSON.parse(sessionStorage.user).id, tableName: ''};
        let initOrderRule = { orderBy: 'tbl_en_nm', sortType: 'asc'};
        this.params.paramMap = Object.assign({}, initParamBase);
        this.params.conditionMap = Object.assign({});
        this.params.sortOrderModel = Object.assign({}, initOrderRule);
        this.params.pageModel = Object.assign({}, initPageModel);
        break;
      case 'byTblname':
        this.params.paramMap.tableName = this.searchTblName;
        break;
      case 'byOption':
        let conditions = Object.assign({});
        for (let opt of  [...this.options,...this.advancedOps]) {
          if(opt.selResult.length){
            conditions[opt.parmName] = opt.selResult;
          }
        };
        console.log(conditions);
        this.params.conditionMap = Object.assign({}, conditions);
        break;
      case 'byOrderRule':
        let orderRule = Object.assign({});
        for (let sort of this.sorts){
          if (sort.isActive) {
            orderRule.orderBy = sort.orderBy;
            orderRule.sortType = sort.sortType;
          }
        };
        this.params.sortOrderModel = Object.assign({}, orderRule);
        this.params.pageModel.currentPage = 1;
        break;
      case 'byPage':
        this.params.pageModel.currentPage = this.currentPage;
        break;
    }
    console.log(this.searchTblName, this.options, this.advancedOps, this.sorts);
  }

  openCard(advancedOpt: any): void {
    if ( !advancedOpt.selMore || advancedOpt !== this.advancedOpt ) {
      this.advancedOpt = advancedOpt;
      advancedOpt.selMore = true;
    } else {
      advancedOpt.selMore = false;
    }
  }

  onSearch(tblName: string): void {
    this.searchTblName = tblName;
    this.getTables('byTblname');
  }

  changeOrder(order): void {
    if (order.isActive) {
      order.sortType = order.sortType === 'asc' ? 'desc' : 'asc';
    } else {
      for (let sort of this.sorts) {
        sort.isActive = false;
      }
      order.isActive = true;
    }
    this.getTables('byOrderRule');
  }

  turnState(): void {
    this.pageState.isCollected = !this.pageState.isCollected;
    if (this.pageState.isCollected) {
      this.searchUrl = 'tablesearch/coll_table ';
      this.pageState.btnName = '返回';
    } else {
      this.searchUrl = 'tablesearch/search ';
      this.pageState.btnName = '收藏的表';
    }
    this.getTables('init');
  }

  turnPage(num: number): void {
    if (!num) { return; }
    this.currentPage = +num;
    this.getTables('byPage');
  }
}
