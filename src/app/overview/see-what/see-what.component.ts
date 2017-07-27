import { Component, OnInit } from '@angular/core';

import { OverviewService } from '../overview.service';

@Component({
  selector: 'see-what',
  templateUrl: './see-what.component.html',
  styleUrls: ['./see-what.component.scss']
})
export class SeeWhatComponent implements OnInit {
  usrCnts: any;

  constructor(
    private overviewService: OverviewService) {
  }

  ngOnInit() {
    this.getUsrCnt();
  }

  getUsrCnt(): void {
    this.overviewService
        .getUsrCnt()
        .then((res) => this.usrCnts = res);
  }

}
