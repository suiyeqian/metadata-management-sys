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
  private browseRecordUrl = 'record/findTopBrowseRecord';
  topRecords = [];
  private collectionUrl = 'collection/findTopCollection';
  topCollections = [];
  chartOption1: any;
  chartOption2: any;

  barOption = this.echartOpt.getOption('bar');

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

  moveTo() {
    this.router.navigate(['/dataMap']);
  }

  getTableDist(): void {
    // this.backendService
    //     .getItemsByJsonParams('tabledistribution/table_dist',{'type':'table'})
    //     .then((res) =>{
    //       let series = [], legendData = [], xAxisData = [];
    //       let initOpt = this.echartOpt.getOption('line');
    //       for (let key of Reflect.ownKeys(res[0])) {
    //         if (key !== 'name') {
    //           xAxisData.push(key);
    //         }
    //       }
    //       for (let item of res) {
    //         let datas = []
    //         for (let [k,v] of (<any>Object).entries(item)) {
    //           if (k !== 'name') {
    //             datas.push(v);
    //           }
    //         }
    //         legendData.push(item.name);
    //         series.push({
    //           name: item.name,
    //           type: 'line',
    //           data: datas
    //         })
    //       }
    //       initOpt.legend.data = [...legendData];
    //       initOpt.xAxis.data = [...xAxisData];
    //       initOpt.series = [...series];
    //       this.chartOption1 = initOpt;
    //     });
    // this.backendService
    //     .getItemsByParams('tabledistribution/table_dist','type=space')
    //     .then((res) =>{
    //       let series = [], legendData = [], xAxisData = [];
    //       let initOpt = this.echartOpt.getOption('line');
    //       for (let key of Reflect.ownKeys(res[0])) {
    //         if (key !== 'name') {
    //           xAxisData.push(key);
    //         }
    //       }
    //       for (let item of res) {
    //         let datas = []
    //         for (let [k,v] of (<any>Object).entries(item)) {
    //           if (k !== 'name') {
    //             datas.push(v!== null? v : 0);
    //           }
    //         }
    //         legendData.push(item.name);
    //         series.push({
    //           name: item.name,
    //           type: 'line',
    //           data: datas
    //         })
    //       }
    //       initOpt.legend.data = [...legendData];
    //       initOpt.xAxis.data = [...xAxisData];
    //       initOpt.series = [...series];
    //       this.chartOption2 = initOpt;
    //     });

    this.backendService
        .getItemsByParams('occupystorage/storage ','type=company')
        .then((res) => {
          console.log(res);
        })

    this.backendService
        .getItemsByParams('occupystorage/storage ','type=table')
        .then((res) => {
          console.log(res);
        })
  }

  getTopRecord(): void {
    this.backendService
        .getItemsByJsonParams(this.browseRecordUrl,{userId:'test'})
        .then((res) => this.topRecords = res);
  }

  getTopCollections(): void {
    this.backendService
        .getItemsByJsonParams(this.collectionUrl,{userId:'test'})
        .then((res) => this.topCollections = res);
  }

}
