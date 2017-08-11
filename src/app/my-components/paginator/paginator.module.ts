import { NgModule } from '@angular/core';

import { PaginatorComponent } from './paginator.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PaginatorComponent
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
