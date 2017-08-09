import { NgModule } from '@angular/core';

import { DataMapComponent } from './data-map.component';

import { SharedModule } from '../shared/shared.module';

import { AngularEchartsModule } from 'ngx-echarts';

import { datamapOptionService } from './dataMap-option.service'

@NgModule({
  imports: [
    SharedModule,
    AngularEchartsModule
  ],
  declarations: [
    DataMapComponent
  ],
  exports: [
    DataMapComponent
  ],
  providers: [ datamapOptionService ]
})

export class DataMapModule {}