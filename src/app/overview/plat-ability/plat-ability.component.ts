import { Component, OnInit } from '@angular/core';

import { OverviewService } from '../overview.service';

@Component({
  selector: 'plat-ability',
  templateUrl: './plat-ability.component.html',
  styleUrls: ['./plat-ability.component.scss']
})
export class PlatAbilityComponent implements OnInit {
  platAbility = {};

  constructor(
    private overviewService: OverviewService) {
  }

  ngOnInit() {
    this.getPlatAbility();
  }

  getPlatAbility(): void {
    this.overviewService
        .getPlatAbility()
        .then((res) => this.platAbility = res);
  }

}
