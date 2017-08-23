import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../core/services/backend.service';
import { SearchParams } from '../../shared/data-model';

@Component({
  selector: 'my-search-index',
  templateUrl: './search-index.component.html',
  styleUrls: ['./search-index.component.scss']
})
export class SearchIndexComponent implements OnInit {
  pagetitle = '指标搜索';
  parentPath = '指标体系';
  searchIdxName: string;
  options = [];
  indexResult = {};
  currentPage = 1;
  sorts = [];
  params = new SearchParams();

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.params.pageModel.pageSize = 10;
    this.initSort();
    this.getMenucodes();
    this.getIndex('init');
  }

  getMenucodes(): void {
    this.backendService
        .getItemsByJsonParams('menucde/get_cde', {menuId: 8})
        .then((res) => {
          for (let value of res){
            value.parmName = value.parmName === 'Company_Flag' ? 'company_name' : value.parmName;
            value.selResult = [];
            value.tmpResult = [];
            // 指标传中文名筛选
            value.selChResult = [];
            value.selMore = false;
            value.ifSingle = false;
            this.options.push(value);
          }
        });
  }

  getIndex(type?: string): void {
    this.setParams(type);
    this.backendService
        .getItemsByJsonParams('indexSearch/search', this.params)
        .then((res) => {
          this.indexResult = res;
        });
  }

  initSort(): void {
    this.sorts = [
      {orderBy: 'idx_nm', desc: '指标名', sortType: 'asc', isActive: true},
      {orderBy: 'idx_owner', desc: '负责人', sortType: 'asc', isActive: false}
    ];
  }

  initOption(): void {
    for (let opt of  [...this.options]) {
      opt.selMore = false;
      opt.ifSingle = false;
      opt.selResult = [];
    }
  }

  setParams(type?: string): void {
    if (type === 'init' ) {
      this.searchIdxName = '';
      this.currentPage = 1;
      this.initSort();
      this.initOption();
    } else if (type === 'byOption') {
      this.currentPage = 1;
    } else if (type === 'byIdxname') {
      this.currentPage = 1;
      this.initSort();
      this.initOption();
    }
    // set params of paramMap
    this.params.paramMap.idx_nm = this.searchIdxName;
    // set params of pageModel
    this.params.pageModel.currentPage = this.currentPage;
    // set params of sortOrderModel
    for (let sort of this.sorts){
      if (sort.isActive) {
        this.params.sortOrderModel.orderBy = sort.orderBy;
        this.params.sortOrderModel.sortType = sort.sortType;
      }
    };
    // set params of conditionMap
    let contditions = {};
    for (let opt of  [...this.options]) {
      opt.selChResult = [];
      if (opt.selResult.length) {
        for (let item of opt.valueList){
          if (opt.selResult.indexOf(item.cdeValue) !== -1 ) {
            opt.selChResult.push(item.cdeValueDesc);
          }
        }
        contditions[opt.parmName] = opt.selChResult;
      }
    };
    this.params.conditionMap = Object.assign({}, contditions);
  }

  onSearch(idxName: string): void {
    this.searchIdxName = idxName;
    this.getIndex('byIdxname');
  }

  onSelectChanged(): void {
    this.getIndex('byOption');
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
    this.getIndex('byOption');
  }

  onPageChanged(num: number): void {
    this.currentPage = +num;
    this.getIndex();
  }

}
