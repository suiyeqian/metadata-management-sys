import { Component } from '@angular/core';

import '../style/app.scss';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user = { name: '测试账号', id: 'test'};

  constructor() {
    sessionStorage.user = JSON.stringify(this.user);
  }
}
