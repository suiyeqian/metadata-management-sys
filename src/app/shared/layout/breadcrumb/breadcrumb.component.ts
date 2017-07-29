import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-breadcrumb',
  template:
  `<div class="breadcrumb text-left">
    当前位置：<a>工作台</a>
    >
    <a>数据概览</a>
    >
    <a class="active">{{curPath}}</a>
  </div>`,
  styles: [`
    .breadcrumb {
      background-color: inherit;
      padding-left: 0;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() curPath: string;

  constructor() {
  }
}
