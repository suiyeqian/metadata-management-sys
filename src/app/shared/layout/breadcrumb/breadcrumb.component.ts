import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-breadcrumb',
  template:
  `<div class="breadcrumb text-left">
    当前位置：<a>工作台</a>
    >
    <a>{{parentPath}}</a>
    >
    <a class="active">{{curPath}}</a>
  </div>`,
  styles: [`
    .breadcrumb {
      background-color: inherit;
      height:40px;
      padding: 18px 0;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() curPath: string;
  @Input() parentPath: string = '数据概览';

  constructor() {
  }
}
