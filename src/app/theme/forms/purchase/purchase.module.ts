import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseComponent} from './purchase.component';
import {PurchaseRoutingModule} from './purchase-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service';
import {DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [PurchaseComponent],
  providers:[ApicallService,DatePipe],
  imports: [
    CommonModule,PurchaseRoutingModule,NgxDatatableModule,FormsModule
  ]
})
export class PurchaseModule { }
