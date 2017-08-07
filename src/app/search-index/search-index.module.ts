import { NgModule } from '@angular/core';

import { SearchIndexComponent } from './search-index.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SearchIndexComponent
  ],
  exports: [
    SearchIndexComponent
  ],
  providers: [ ]
})
export class SearchIndexModule { }
