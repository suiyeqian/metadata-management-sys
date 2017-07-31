import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'my-where',
  templateUrl: './where.component.html',
  styleUrls: ['./where.component.scss']
})
export class WhereComponent implements OnInit {
  companys = [];
  private companyUrl = '/mdms/servicesoverview/findUserCntByCompanyFlag';

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getCompony();
  }

  getCompony(): void {
    this.backendService
        .getAll(this.companyUrl)
        .then((res) => {
          for (let item of res) {
            if (item.companyName !== '牛鼎丰') {
                this.companys.push(item);
            }
          }
        });
  }

}
