import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooklistComponent } from './booklist.component';
import { BookListRoutingModule } from './booklist-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BooklistComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    BookListRoutingModule,
    FormsModule
   
  ]
})
export class BooklistModule { }
