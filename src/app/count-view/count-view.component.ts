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
  cpyStoragebarOpt: any;
  tblStoragebarOpt: any;

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

  goTo(tbl): void {
    this.router.navigate(['pages/tableDetail', tbl.id]);
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
          initOpt.yAxis.axisLabel.formatter = '{value} GB';
          this.SpaceDistOption2 = initOpt;
        });

    this.backendService
        .getItemsByJsonParams('occupystorage/storage ', {'type': 'company'})
        .then((res) => {
          let initOpt = this.echartOpt.getOption('bar');
          for (let item of res) {
            initOpt.xAxis[0].data.push(item.name);
            initOpt.series[0].data.push(item.size);
          }
          initOpt.series[0].label.normal.formatter = '{c} GB';
          this.cpyStoragebarOpt = initOpt;
        });

    this.backendService
        .getItemsByJsonParams('occupystorage/storage ', {'type': 'table'})
        .then((res) => {
          let initOpt = this.echartOpt.getOption('bar');
          for (let item of res) {
            initOpt.xAxis[0].data.push(item.name);
            initOpt.series[0].data.push(item.size);
          }
          initOpt.tooltip.formatter = '{b}：{c} MB';
          initOpt.series[0].label.normal.formatter = '{c} MB';
          this.tblStoragebarOpt = initOpt;
        });
  }

  getTopRecord(): void {
    this.backendService
        .getItemsByJsonParams('record/findTopBrowseRecord', {userId: JSON.parse(localStorage.user).id})
        .then((res) => this.topRecords = res);
  }

  getTopCollections(): void {
    this.backendService
        .getItemsByJsonParams('collection/findTopCollection', {userId: JSON.parse(localStorage.user).id})
        .then((res) => this.topCollections = res);
  }

}
