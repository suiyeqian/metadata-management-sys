import { NgModule,  Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { BackendService } from './services/backend.service';
import { UserService } from './services/user.service';
import { SpinnerService } from './services/spinner.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SidenavComponent,
    HeaderComponent
  ],
  exports: [
    SidenavComponent,
    HeaderComponent
  ],
  providers: [
    UserService,
    BackendService,
    SpinnerService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
