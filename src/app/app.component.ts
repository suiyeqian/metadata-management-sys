import { Component } from '@angular/core';

import '../style/app.scss';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {
  user = { name: '测试账号', id: 'test'};

  constructor() {
    sessionStorage.user = JSON.stringify(this.user);
  }
}
