import { Component, OnInit, Input } from '@angular/core';

import { BackendService } from '../services/backend.service';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() userName: string;

  constructor(
    private bdService: BackendService
  ) {}

  ngOnInit() {
  }

  logout(): void {
    this.bdService
        .getItemsByJsonParams('logout', {})
        .then((res) => {
          localStorage.clear();
          window.location.href = res + '/resources/mdms/login.html';
        });

  }
}
