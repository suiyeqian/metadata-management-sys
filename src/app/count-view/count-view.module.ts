import { NgModule } from '@angular/core';

import { CountViewComponent } from './count-view.component';

import { AngularEchartsModule } from 'ngx-echarts';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AngularEchartsModule,
    SharedModule
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
