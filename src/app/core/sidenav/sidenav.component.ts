import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'my-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  showMenu: string;
  private menuUrl = '/mdms/menu/findMenuInfoByMenuType';
  menus = [];

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getMenus();
  }

  getMenus(): void {
    this.backendService
        .getAll(this.menuUrl)
        .then((res) => {
          this.menus = res;
          this.showMenu = this.menus[0].menuCode;
        });
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
}
