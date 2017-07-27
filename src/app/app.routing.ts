import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { DataMapComponent } from './data-map/data-map.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'data-map', component: DataMapComponent}
];

export const routing = RouterModule.forRoot(routes);
