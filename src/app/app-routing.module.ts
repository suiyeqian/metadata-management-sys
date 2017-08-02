import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { DataMapComponent } from './data-map/data-map.component';
import { CountViewComponent } from './count-view/count-view.component';
import { SearchTableComponent } from './search-table/search-table.component';

const appRoutes: Routes = [
  { path: 'serviceView', component: OverviewComponent },
  { path: 'dataMap', component: DataMapComponent },
  { path: 'countView', component: CountViewComponent },
  { path: 'searchTable', component: SearchTableComponent },
  { path: '', redirectTo: '/serviceView', pathMatch: 'full' },
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
