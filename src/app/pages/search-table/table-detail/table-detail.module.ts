import { NgModule } from '@angular/core';

import { TableDetailComponent } from './table-detail.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TableDetailComponent
  ],
  exports: [ ],
  providers: [ ]
})
export class TableDetailModule { }
