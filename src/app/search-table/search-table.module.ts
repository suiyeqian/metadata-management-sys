import { NgModule } from '@angular/core';

import { SearchTableComponent } from './search-table.component';
import { RmPrefixPipe } from './rm-prefix.pipe';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SearchTableComponent,
    RmPrefixPipe
  ],
  exports: [
    SearchTableComponent
  ],
  providers: [ ]
})
export class SearchTableModule { }
