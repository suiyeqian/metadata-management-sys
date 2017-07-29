import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule
   ],
  declarations: [
    BreadcrumbComponent,
    PageTitleComponent,
  ],
  exports:      [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
    PageTitleComponent
  ]
})
export class SharedModule { }
