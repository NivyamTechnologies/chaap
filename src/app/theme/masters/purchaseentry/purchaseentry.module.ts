import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseentryComponent} from './purchaseentry.component'
import {RouterModule,Routes} from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
const routes : Routes = [{
  path : '',
  component : PurchaseentryComponent,
  data : {
    title : 'Purchase',
    icon : 'ti-layers',
    status : true
  }
}]



@NgModule({
declarations: [PurchaseentryComponent],
imports: [
  CommonModule,
  SharedModule,
  FormsModule,
  NgxDatatableModule,
  RouterModule.forChild(routes)
],
exports : [RouterModule]
})
export class PurchaseentryModule { }
