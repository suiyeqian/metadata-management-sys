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

  constructor() {
  }
}
