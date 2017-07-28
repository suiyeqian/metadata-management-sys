import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './shared/in-memory-data.service';

import { AppComponent } from './app.component';
import { DataMapComponent } from './data-map/data-map.component';
import { SidenavComponent } from './shared/layout/sidenav/sidenav.component';

/* Feature Modules */
import { OverviewModule }    from './overview/overview.module';

/* Routing Module */
import { routing } from './app.routing';

import { BackendService } from './shared/backend.service';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    OverviewModule,
    routing
  ],
  declarations: [
    AppComponent,
    DataMapComponent,
    SidenavComponent
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
