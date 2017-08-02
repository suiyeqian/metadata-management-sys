import { NgModule } from '@angular/core';

import { SearchTableComponent } from './search-table.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SearchTableComponent
  ],
  exports: [
    SearchTableComponent
  ],
  providers: [ ]
})
export class SearchTableModule { }
