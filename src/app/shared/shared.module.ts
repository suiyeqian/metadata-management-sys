import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    NgbModule
   ],
  declarations: [
    BreadcrumbComponent,
    PageTitleComponent,
  ],
  exports:      [
    CommonModule,
    FormsModule,
    NgbModule,
    BreadcrumbComponent,
    PageTitleComponent
  ]
})
export class SharedModule { }
