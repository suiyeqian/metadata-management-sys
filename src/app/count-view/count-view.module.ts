import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularEchartsModule } from 'ngx-echarts';

import { CountViewComponent } from './count-view.component';

@NgModule({
  imports: [
    CommonModule,
    AngularEchartsModule
  ],
  declarations: [
    CountViewComponent
  ],
  exports: [
    CountViewComponent
  ],
  providers: [ ]
})
export class CountViewModule { }
