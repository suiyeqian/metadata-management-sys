import { Component, OnInit } from '@angular/core';

import { OverviewService } from '../overview.service';

@Component({
  selector: 'my-where',
  templateUrl: './where.component.html',
  styleUrls: ['./where.component.scss']
})
export class WhereComponent implements OnInit {
  companys = [];

  constructor(
    private overviewService: OverviewService) {
  }

  ngOnInit() {
    this.getCompony();
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

}
