import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { OverviewComponent } from '../overview/overview.component';
import { DataMapComponent } from '../data-map/data-map.component';
import { CountViewComponent } from '../count-view/count-view.component';
import { SearchTableComponent } from '../search-table/search-table.component';
import { TableDetailComponent } from '../search-table/table-detail/table-detail.component';
import { SearchIndexComponent } from '../search-index/search-index.component';
import { UserService } from '../core/services/user.service';

const pagesRoutes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [ UserService ],
    children: [
      { path: '', redirectTo: 'serviceView', pathMatch: 'full' },
      { path: 'serviceView', component: OverviewComponent },
      { path: 'dataMap', component: DataMapComponent },
      { path: 'countView', component: CountViewComponent },
      { path: 'searchTable', component: SearchTableComponent },
      { path: 'tableDetail/:id', component: TableDetailComponent },
      { path: 'indexSearch', component: SearchIndexComponent }
    ]
  },
  { path: '**', redirectTo: 'pages/serviceView' }
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}
