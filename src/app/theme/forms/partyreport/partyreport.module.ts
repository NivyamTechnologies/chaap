import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PartyreportComponent} from './partyreport.component';
import {PartyreportRoutingModule} from './partyreport-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service';
import {DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PartyreportComponent],
  providers:[ApicallService,DatePipe],
  imports: [
    CommonModule,PartyreportRoutingModule,NgxDatatableModule,FormsModule
  ]
})
export class PartyreportModule { }
