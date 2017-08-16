import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { DataMapComponent } from './data-map/data-map.component';
import { CountViewComponent } from './count-view/count-view.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { TableDetailComponent } from './search-table/table-detail/table-detail.component';
import { SearchIndexComponent } from './search-index/search-index.component';

const appRoutes: Routes = [
  { path: 'serviceView', component: OverviewComponent },
  { path: 'dataMap', component: DataMapComponent },
  { path: 'countView', component: CountViewComponent },
  { path: 'searchTable', component: SearchTableComponent },
  { path: 'tableDetail/:id', component: TableDetailComponent },
  { path: 'indexSearch', component: SearchIndexComponent },
  // {
  //   path: 'admin',
  //   loadChildren: 'app/admin/admin.module#AdminModule'
  // },
  { path: '', redirectTo: '/serviceView', pathMatch: 'full' },
  { path: '**', component: OverviewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
