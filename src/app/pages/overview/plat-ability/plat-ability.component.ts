import { Component, OnInit } from '@angular/core';

import { BackendService } from '../../../core/services/backend.service';

@Component({
  selector: 'plat-ability',
  templateUrl: './plat-ability.component.html',
  styleUrls: ['./plat-ability.component.scss']
})
export class PlatAbilityComponent implements OnInit {
  platAbility = {};
  private platAbilityUrl = 'servicesoverview/countPlatAbility';

  constructor(
    private backendService: BackendService) {
  }

  ngOnInit() {
    this.getPlatAbility();
  }

  getPlatAbility(): void {
    this.backendService
        .getAll(this.platAbilityUrl)
        .then((res) => this.platAbility = res);
  }

}
