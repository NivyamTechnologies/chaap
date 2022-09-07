import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsaleorderComponent } from './newsaleorder.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes = [{
  path : '',
  component : NewsaleorderComponent,

}]

@NgModule({
  declarations: [NewsaleorderComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],

  exports : [RouterModule]
})
export class NewsaleorderModule { }
