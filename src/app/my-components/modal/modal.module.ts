import { NgModule } from '@angular/core';

import { ModalComponent } from './modal.component';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ModalComponent,
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule {}
