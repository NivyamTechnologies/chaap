import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolComponent } from './school/school.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SchoolComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [SchoolComponent]
})
export class DropdownsModule { }
