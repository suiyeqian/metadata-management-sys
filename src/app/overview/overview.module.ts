import { NgModule } from '@angular/core';

import { OverviewComponent } from './overview.component';
import { SeeWhatComponent } from './see-what/see-what.component';
import { WhereComponent } from './where/where.component';
import { PlatAbilityComponent } from './plat-ability/plat-ability.component';

import { SharedModule } from '../shared/shared.module';

import { AngularEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    SharedModule,
    AngularEchartsModule
  ],
  declarations: [
    OverviewComponent,
    SeeWhatComponent,
    WhereComponent,
    PlatAbilityComponent
  ],
  exports: [
    OverviewComponent,
    SeeWhatComponent,
    WhereComponent,
    PlatAbilityComponent
  ],
  providers: [ ]
})
export class OverviewModule { }
