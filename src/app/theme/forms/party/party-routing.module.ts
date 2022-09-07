import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PartyComponent } from './party.component'

const routes: Routes = [
  {
    path: '',
    component: PartyComponent,
    data: {
      title: 'Add Party',
      icon: 'ti-layers',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyRoutingModule { }
