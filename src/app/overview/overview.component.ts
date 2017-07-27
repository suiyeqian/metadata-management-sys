import { Component, OnInit } from '@angular/core';

import { OverviewService } from './overview.service';

@Component({
  selector: 'my-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  usrCnts: any;
  companys = [];
  platAbility = {};

  constructor(
    private overviewService: OverviewService) {
  }

  ngOnInit() {
    this.getUsrCnt();
    this.getCompony();
    this.getPlatAbility();
  }

  getUsrCnt(): void {
    this.overviewService
        .getUsrCnt()
        .then((res) => this.usrCnts = res);
  }

  getCompony(): void {
    this.overviewService
        .getCompony()
        .then((res) => {
          for (let item of res) {
            if (item.companyName !== '牛鼎丰') {
                this.companys.push(item);
            }
          }
        });
  }

  getPlatAbility(): void {
    this.overviewService
        .getPlatAbility()
        .then((res) => this.platAbility = res);
  }

}
