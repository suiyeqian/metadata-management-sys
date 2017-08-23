import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';

@Component({
  selector: 'see-what',
  templateUrl: './see-what.component.html',
  styleUrls: ['./see-what.component.scss']
})
export class SeeWhatComponent implements OnInit {
  usrCnts: any;
  private userCntUrl = 'servicesoverview/findUsrCntByAppCde';
  pieOption: any;

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getUsrCnt();
  }

  getUsrCnt(): void {
    this.backendService
        .getAll(this.userCntUrl)
        .then((res) => {
          let seriesData = [];
          for (let item of res) {
            seriesData.push({
              value: item.cntTotal,
              name: item.appNm
            });
          }
          this.usrCnts = res;
          this.pieOption = {
            tooltip: {
              trigger: 'item',
              formatter: '{b}：<span style="font-weight:bold">{c}</span> 人'
            },
            color: ['#fbb367', '#fb8070', '#2ec7c9', '#b6a2de', '#5ab1ef', '#99cccc', '#fc9', '#fbccec', '#ffed6f'],
            series: [
              {
                type: 'pie',
                radius: ['60%', '90%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '16',
                          fontWeight: 'bold'
                      }
                  }
                },
                labelLine: {
                  normal: {
                      show: false
                  }
                },
                data: seriesData
              }
          ]
        };
      });
  }
}
