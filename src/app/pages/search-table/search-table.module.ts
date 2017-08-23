import { NgModule } from '@angular/core';

import { SearchTableComponent } from './search-table.component';

import { SelectBoxModule } from '../../my-components/select-box/select-box.module';
import { PaginatorModule } from '../../my-components/paginator/paginator.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SelectBoxModule,
    SharedModule,
    PaginatorModule
  ],
  declarations: [
    SearchTableComponent,
  ],
  exports: [ ],
  providers: [ ]
})
export class SearchTableModule { }
