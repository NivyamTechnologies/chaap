import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasechallanComponent } from './purchasechallan.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes = [{
  path : '',
  component : PurchasechallanComponent,
  data : {
    title: 'Purchase Challan Browser',
    icon: 'ti-layers',
    status: true
  }
}]

@NgModule({
  declarations: [PurchasechallanComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class PurchasechallanModule { }
