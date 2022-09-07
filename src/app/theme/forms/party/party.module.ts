import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PartyComponent} from './party.component';
import {PartyRoutingModule} from './party-routing.module'
// import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service';
import {DatePipe} from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { from } from 'rxjs';

@NgModule({
  declarations: [PartyComponent],
  providers:[ApicallService,DatePipe],
  imports: [
    CommonModule,PartyRoutingModule,FormsModule,ReactiveFormsModule]
})
export class PartyModule { }
