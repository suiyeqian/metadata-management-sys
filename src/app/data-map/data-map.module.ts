import { NgModule } from '@angular/core';

import { DataMapComponent } from './data-map.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DataMapComponent
  ],
  exports: [
    DataMapComponent
  ],
  providers: [  ]
})

export class DataMapModule {}