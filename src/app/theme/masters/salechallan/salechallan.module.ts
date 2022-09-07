import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalechallanComponent } from './salechallan.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes : Routes = [{
  path : '',
  component : SalechallanComponent,

}]

@NgModule({
  declarations: [SalechallanComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],

  exports : [RouterModule]
})
export class SalechallanModule { }
