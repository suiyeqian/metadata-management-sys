import { NgModule } from '@angular/core';

import { SelectBoxComponent } from './select-box.component';
import { RmPrefixPipe } from './rm-prefix.pipe';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SelectBoxComponent,
    RmPrefixPipe
  ],
  exports: [
    SelectBoxComponent
  ]
})
export class SelectBoxModule { }
