import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { OverviewComponent } from './overview.component';
import { SeeWhatComponent } from './see-what/see-what.component';
import { WhereComponent } from './where/where.component';
import { PlatAbilityComponent } from './plat-ability/plat-ability.component';

// import { PageTitleModule } from '../shared/layout/page-title/page-title.module';
// import { BreadcrumbModule } from '../shared/layout/breadcrumb/breadcrumb.module';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    // PageTitleModule,
    SharedModule
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
