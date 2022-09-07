import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale.component';
import {RouterModule,Routes} from '@angular/router'
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes : Routes = [{
  path : '',
  component : SaleComponent,
  data : {
    title : 'Sale',
    icon : 'ti-layers',
    status : true
  }
}]

@NgModule({
  declarations: [SaleComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})


export class SaleModule { }
