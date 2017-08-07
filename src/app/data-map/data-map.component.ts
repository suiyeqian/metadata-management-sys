import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.scss']
})

export class DataMapComponent implements OnInit {
  pagetitle = '数据地图';
  searchModel = {
    tableName: string
  };

  private searchTableUrl = 'tablesearch/search';

  
  constructor() {
  }

  ngOnInit() {
  }

  tableNameChange(name: string) {
console.log(name);
  }
}
