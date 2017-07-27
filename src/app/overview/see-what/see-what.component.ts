import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'see-what',
  templateUrl: './see-what.component.html',
  styleUrls: ['./see-what.component.scss']
})
export class SeeWhatComponent implements OnInit {
  usrCnts: any;
  // private userCntUrl = 'http://xn071213-nb.xiaoniu.com:8088/mdms/servicesoverview/findUsrCntByAppCde';
  private userCntUrl = 'api/datas';

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getUsrCnt();
  }

  getUsrCnt(): void {
    this.backendService
        .getAll(this.userCntUrl)
        .then((res) => this.usrCnts = res);
  }

}
