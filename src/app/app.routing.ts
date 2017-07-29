import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { DataMapComponent } from './data-map/data-map.component';
import { CountViewComponent } from './count-view/count-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/serviceView', pathMatch: 'full' },
  { path: 'serviceView', component: OverviewComponent },
  { path: 'dataMap', component: DataMapComponent },
  { path: 'countView', component: CountViewComponent }
];

export const routing = RouterModule.forRoot(routes);
