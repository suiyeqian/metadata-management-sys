import { Component, OnInit  } from '@angular/core';

import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'my-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  pagetitle = '表搜索';
  private menucodeUrl = 'menucde/get_cde';
  private searchTableUrl = 'tablesearch/search';
  searchModel = {};
  options = [];
  advancedOps = [];
  tblResult = {};

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getMenucodes();
    this.getTables();
  }

  getMenucodes(): void {
    this.backendService
        .getItemsByJsonParams(this.menucodeUrl, {menuId: 7})
        .then((res) => {
          for (let value of res){
            if (value.isOption === '0') {
              value.selMore = false;
              value.ifSingle = false;
              value.selResult = [];
              this.options.push(value);
            } else {
              this.advancedOps.push(value);
            }
          }
        });
  }

  getTables(): void {
    this.backendService
        .getItemsByJsonParams(this.searchTableUrl, {currentPage: 1, pageSize: 20})
        .then((res) => this.tblResult = res);
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

}
