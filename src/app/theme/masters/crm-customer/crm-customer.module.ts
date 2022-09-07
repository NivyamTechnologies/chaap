import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CrmCustomerComponent} from './crm-customer.component'
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
const routes : Routes = [{
  path : '',
  component : CrmCustomerComponent,
  data : {
    title : 'Customer',
    icon : 'ti-layers',
    status : true
  }
}]
@NgModule({
  declarations: [CrmCustomerComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class CrmCustomerModule { }
