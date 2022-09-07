import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PurchasereportComponent } from './purchasereport.component'

const routes: Routes = [
  {
    path: '',
    component: PurchasereportComponent,
    data: {
      title: 'Purchase Report',
      icon: 'ti-layers',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasereportRoutingModule { }
