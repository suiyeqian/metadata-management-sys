import { NgModule,  Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { UserService } from './user.service';

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
  providers: [ UserService ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
