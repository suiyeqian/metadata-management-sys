import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  pagetitle = '服务概览';

  constructor() {
  }

  ngOnInit() {
  }

}
