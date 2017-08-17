import { Component } from '@angular/core';

import { UserService } from '../core/user.service';

@Component({
  selector: 'my-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  user = { name: '测试账号', id: 'test'};

  constructor(
    private userService: UserService
  ) {
    sessionStorage.user = JSON.stringify(this.user);
    console.log(this.userService.canActivate());
  }
}
