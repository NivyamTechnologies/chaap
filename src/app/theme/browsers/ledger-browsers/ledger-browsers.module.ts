import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router'
import { LedgerBrowsersComponent } from './ledger-browsers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const route : Routes = [{
  path : '',
  component : LedgerBrowsersComponent,
  data : {
    title: 'Ledger Browser',
    icon: 'ti-layers',
    status: true
  }
}]

@NgModule({
  declarations: [LedgerBrowsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(route)
  ],
  exports : [RouterModule]
})
export class LedgerBrowsersModule { }
