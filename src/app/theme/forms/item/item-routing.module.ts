import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemComponent} from './item.component'

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
    data: {
      title: 'Add Item',
      icon: 'ti-layers',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
