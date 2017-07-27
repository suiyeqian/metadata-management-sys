import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewComponent } from './overview.component';
import { SeeWhatComponent } from './see-what/see-what.component';
import { WhereComponent } from './where/where.component';
import { PlatAbilityComponent } from './plat-ability/plat-ability.component';

import { OverviewService } from './overview.service';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ OverviewComponent, SeeWhatComponent, WhereComponent, PlatAbilityComponent ],
  exports:      [ OverviewComponent, SeeWhatComponent, WhereComponent, PlatAbilityComponent ],
  providers:    [ OverviewService ]
})
export class OverviewModule { }
