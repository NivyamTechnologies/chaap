import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemreportComponent} from './itemreport.component';
import {ItemreportRoutingModule} from './itemreport-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service';
import {DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemreportComponent],
  providers:[ApicallService,DatePipe],
  imports: [
    CommonModule,ItemreportRoutingModule,NgxDatatableModule,FormsModule
  ]
})
export class ItemreportModule { }
