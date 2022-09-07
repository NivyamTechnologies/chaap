import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchallanbrowserComponent } from './schallanbrowser.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes = [{
  path : '',
  component : SchallanbrowserComponent,
  data : {
    title: 'Sale',
    icon: 'ti-layers',
    status: true
  }
}]

@NgModule({
  declarations: [SchallanbrowserComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class SchallanbrowserModule { }
