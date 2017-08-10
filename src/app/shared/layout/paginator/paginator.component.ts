import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'my-paginator',
  template:
  `<div class="page-wrap">
    <span class="page-num">
      <a href="javascript:;" class="page-prev" [class.disabled]="currentPage === 1" (click)="turnPage(currentPage-1)" ><上一页</a>
      <b class="page-break" *ngIf="currentPage > 4 " >...</b>
      <a href="javascript:;" *ngFor = "let i of pageNums" [class.active]="currentPage === i" class="page-nb" (click)="turnPage(i)">{{i}}</a>
      <b class="page-break" *ngIf="totalPage - currentPage > 4">...</b>
      <a href="javascript:;" class="page-next" [class.disabled]="currentPage === totalPage" (click)="turnPage(currentPage+1)" >下一页></a>
    </span>
    <span class="page-skip">
      共{{totalPage}}页 到第 <input type="text" class="skip-num" #skipNum > 页
      <button class="btn btn-sm btn-blue" (click)="turnPage(skipNum.value>totalPage?totalPage:skipNum.value)">确定</button>
    </span>
  </div>`,
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() currentPage: number;
  @Input() totalPage: number;
  @Output() onPageChanged = new EventEmitter<number>();
  pageNums = [];

  constructor() {
  }

  ngOnChanges() {
    this.setPageNums(this.totalPage);
  }

  setPageNums(totalPage, displayNum = 7): void {
    let initNums = [];
    for ( let i = 1; i <= (totalPage > displayNum ? displayNum : totalPage); i++) {
      initNums.push(i);
    }
    if ( totalPage < displayNum ) {
      this.pageNums = initNums;
      return;
    }
    if ( this.currentPage < 4 ) {
      this.pageNums = initNums;
    } else if ( totalPage - this.currentPage < 4 ) {
      this.pageNums = initNums.map((i) => totalPage - i + 1).reverse();
    } else {
      this.pageNums = initNums.map((i) => this.currentPage - i + 4 ).reverse();
    }
  }

  turnPage(num: number) {
    if (!num) { return; }
    let toPage = +num;
    if (num < 1) {
      toPage = 1;
    } else if (num > this.totalPage) {
      toPage = this.totalPage;
    }
    this.onPageChanged.emit(toPage);
  }

}
