import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service';
import {DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PurchasereportRoutingModule} from './purchasereport-routing.module';
import {PurchasereportComponent} from './purchasereport.component'
@NgModule({
  declarations: [PurchasereportComponent],
  providers:[ApicallService,DatePipe],
  imports: [
    CommonModule,PurchasereportRoutingModule,NgxDatatableModule,FormsModule
  ]
})
export class PurchasereportModule { }
