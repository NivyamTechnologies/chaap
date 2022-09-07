import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PartyreportComponent } from './partyreport.component'

const routes: Routes = [
  {
    path: '',
    component: PartyreportComponent,
    data: {
      title: 'Party Report',
      icon: 'ti-layers',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyreportRoutingModule { }
