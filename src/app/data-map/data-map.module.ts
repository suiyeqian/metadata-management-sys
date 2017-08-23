import { NgModule } from '@angular/core';

import { DataMapComponent } from './data-map.component';

import { SharedModule } from '../shared/shared.module';
import { ModalModule } from '../my-components/modal/modal.module';

import { AngularEchartsModule } from 'ngx-echarts';

import { datamapOptionService } from './dataMap-option.service';


@NgModule({
  imports: [
    SharedModule,
    AngularEchartsModule,
    ModalModule
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