import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { Router } from '@angular/router';

import { BackendService } from '../shared/backend.service';

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


  chartOption = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    color:['#16c6eb','#29e9bd', '#ae8ad1', '#f4c42d', '#f44336'],
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日'],
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
  };

  barOption = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
        }
    ],
    series : [
        {
            type:'bar',
            barWidth: '60%',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data:[50, 30, 20, 10, 10,],
            itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#2aeabe'
                    }, {
                        offset: 1, color: '#15c6eb'
                    }],
                  }
                }
            }
        }
    ]
  };

  constructor(
    private router: Router,
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getTopRecord();
    this.getTopCollections();
  }

  moveTo() {
    this.router.navigate(['/dataMap']);
  }

  getTopRecord(): void {
    this.backendService
        .getItemsByParams(this.browseRecordUrl,'userId=test')
        .then((res) => this.topRecords = res);
  }

  getTopCollections(): void {
    this.backendService
        .getItemsByParams(this.collectionUrl,'userId=test')
        .then((res) => this.topCollections = res);
  }

}
