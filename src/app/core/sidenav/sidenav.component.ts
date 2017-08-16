import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../shared/backend.service';

@Component({
  selector: 'my-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  showMenu: string;
  private menuUrl = 'menu/findMenuInfoByMenuType';
  menus = [];

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getMenus();
  }

  getMenus(): void {
    this.backendService
        .getItemsByJsonParams(this.menuUrl, {})
        .then((res) => {
          this.menus = res;
          this.menus[0].icon = 'home';
          this.menus[1].icon = 'find_in_page';
          this.menus[2].icon = 'class';
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
