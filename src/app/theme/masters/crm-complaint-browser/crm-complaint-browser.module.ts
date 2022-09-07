import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CrmComplaintBrowserComponent} from './crm-complaint-browser.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
const routes : Routes = [{
  path : '',
  component : CrmComplaintBrowserComponent,

}]
@NgModule({
  declarations: [CrmComplaintBrowserComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class CrmComplaintBrowserModule { }
