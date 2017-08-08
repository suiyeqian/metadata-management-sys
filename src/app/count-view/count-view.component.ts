import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import { BackendService } from '../shared/backend.service';
import { EchartOptionService } from './echart-option.service';

@Component({
  selector: 'my-count-view',
  templateUrl: './count-view.component.html',
  styleUrls: ['./count-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountViewComponent implements OnInit {
  pagetitle = '统计查阅';
  topRecords = [];
  topCollections = [];
  tblDistOption1: any;
  SpaceDistOption2: any;
  barOption: any;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private echartOpt: EchartOptionService) {
  }

  ngOnInit() {
    this.getTopRecord();
    this.getTopCollections();
    this.getTableDist();
  }

  goTo(tbl) {
    this.router.navigate(['/tableDetail', tbl.id]);
  }

  getTableDist(): void {
    this.backendService
        .getItemsByJsonParams('tabledistribution/table_dist', {'type': 'table'})
        .then((res) => {
          let initOpt = this.echartOpt.getOption('line');
          for (let item of res.list) {
            initOpt.legend.data.push(item.name);
            initOpt.series.push({
              name: item.name,
              type: 'line',
              data: [...item.numberList]
            });
          }
          initOpt.xAxis.data = [...res.dataLvlList];
          this.tblDistOption1 = initOpt;
        });

    this.backendService
        .getItemsByJsonParams('tabledistribution/table_dist', {'type': 'space'})
        .then((res) => {
          let initOpt = this.echartOpt.getOption('line');
          for (let item of res.list) {
            initOpt.legend.data.push(item.name);
            initOpt.series.push({
              name: item.name,
              type: 'line',
              data: [...item.numberList]
            });
          }
          initOpt.xAxis.data = [...res.dataLvlList];
          this.SpaceDistOption2 = initOpt;
        });

    this.backendService
        .getItemsByJsonParams('occupystorage/storage ', {'type': 'company'})
        .then((res) => {
          console.log(res);
          this.barOption = this.echartOpt.getOption('bar');
        });

    this.backendService
        .getItemsByJsonParams('occupystorage/storage ', {'type': 'table'})
        .then((res) => {
          console.log(res);
        });
  }

  getTopRecord(): void {
    this.backendService
        .getItemsByJsonParams('record/findTopBrowseRecord', {userId: 'test'})
        .then((res) => this.topRecords = res);
  }

  getTopCollections(): void {
    this.backendService
        .getItemsByJsonParams('collection/findTopCollection', {userId: 'test'})
        .then((res) => this.topCollections = res);
  }

}
