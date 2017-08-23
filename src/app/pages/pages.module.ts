import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CoreModule } from '../core/core.module';

import { OverviewModule } from './overview/overview.module';
import { DataMapModule } from './data-map/data-map.module';
import { CountViewModule } from './count-view/count-view.module';
import { SearchTableModule } from './search-table/search-table.module';
import { TableDetailModule } from './search-table/table-detail/table-detail.module';
import { SearchIndexModule } from './search-index/search-index.module';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    CoreModule,
    OverviewModule,
    DataMapModule,
    CountViewModule,
    SearchTableModule,
    TableDetailModule,
    SearchIndexModule,
    PagesRoutingModule
  ],
  declarations: [
    PagesComponent
  ],
  providers: [ ]
})
export class PagesModule { }
