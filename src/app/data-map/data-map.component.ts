import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'my-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss']
})

export class DataMapComponent implements OnInit {
  pagetitle = '数据地图';
  searchModel= { };
  searchList = {};
  isChNm = false;

  private tableNameType = /^[\u4e00-\u9fa5]$/;
  private searchTableUrl = 'datamap/searchTableInfo';

  
  constructor(private backendService: BackendService) {

  }

  ngOnInit():void {
    this.searchList = {};
    this.isChNm = false;
  }

  
  getTableList(name: string):void {
    this.backendService
        .getItemsByJsonParams(this.searchTableUrl, {tableName: name})
        .then((res) => {
          this.searchList = res;
        })
  }

  tableNameChange(name: string):void {
console.log(name);
    this.getTableList(name);
    if (this.tableNameType.test(name)) {
      this.isChNm = true;
    }else {
      this.isChNm = false;
    }
console.log(this.isChNm);
  }
}
