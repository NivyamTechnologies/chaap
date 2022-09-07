import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router'
import { AccountledgerComponent } from './accountledger.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

const route : Routes  =  [
  {
    path : '',
    component : AccountledgerComponent
  }
]

@NgModule({
  declarations: [AccountledgerComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(route)
  ],
  exports : [RouterModule]
})
export class AccountledgerModule { }
