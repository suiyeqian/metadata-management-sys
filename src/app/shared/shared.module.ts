import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';
import { PaginatorComponent } from './layout/paginator/paginator.component';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    NgbModule
   ],
  declarations: [
    BreadcrumbComponent,
    PageTitleComponent,
    PaginatorComponent
  ],
  exports:      [
    CommonModule,
    FormsModule,
    NgbModule,
    BreadcrumbComponent,
    PageTitleComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
