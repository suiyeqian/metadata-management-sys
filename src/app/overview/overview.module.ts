import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';

import { OverviewComponent } from './overview.component';
import { OverviewService } from './overview.service';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ OverviewComponent ],
  exports:      [ OverviewComponent ],
  providers:    [ OverviewService ]
})
export class OverviewModule { }
