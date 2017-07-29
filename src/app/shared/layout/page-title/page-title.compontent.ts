import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-page-title',
  template: `
    <div class="page-title">
      <h3>{{pagetitle}}</h3>
    </div>
  `,
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent {
  @Input() pagetitle = '';

  constructor() {
  }
}
