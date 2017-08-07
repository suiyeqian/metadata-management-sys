import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './shared/in-memory-data.service';

import { AppComponent } from './app.component';
// import { DataMapComponent } from './data-map/data-map.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { CountViewModule } from './count-view/count-view.module';
import { OverviewModule } from './overview/overview.module';
import { SearchTableModule } from './search-table/search-table.module';
import { TableDetailModule } from './search-table/table-detail/table-detail.module';
import { DataMapModule } from './data-map/data-map.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

import { BackendService } from './shared/backend.service';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CountViewModule,
    CoreModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgbModule.forRoot(),
    OverviewModule,
    SearchTableModule,
    TableDetailModule,
    AppRoutingModule,
    DataMapModule
  ],
  declarations: [
    AppComponent
    // DataMapComponent
  ],
  providers: [ BackendService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
