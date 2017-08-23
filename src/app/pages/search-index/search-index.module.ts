import { NgModule } from '@angular/core';

import { SearchIndexComponent } from './search-index.component';

import { SharedModule } from '../../shared/shared.module';
import { SelectBoxModule } from '../../my-components/select-box/select-box.module';
import { PaginatorModule } from '../../my-components/paginator/paginator.module';

@NgModule({
  imports: [
    SharedModule,
    SelectBoxModule,
    PaginatorModule
  ],
  declarations: [
    SearchIndexComponent
  ],
  exports: [ ],
  providers: [ ]
})
export class SearchIndexModule { }
