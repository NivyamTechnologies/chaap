import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBrowserRouting } from './list-browser.routing.module';
import { ListBrowserComponent } from './list-browser.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListBrowserComponent],
  imports: [
    CommonModule,
    ListBrowserRouting,
    NgxDatatableModule,
    FormsModule,
    SharedModule
  ]
})
export class ListBrowser { }
