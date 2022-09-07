import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ItemreportComponent } from './itemreport.component'

const routes: Routes = [
  {
    path: '',
    component: ItemreportComponent,
    data: {
      title: 'Item Report',
      icon: 'ti-layers',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemreportRoutingModule { }
