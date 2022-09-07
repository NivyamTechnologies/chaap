import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListBrowserComponent} from './list-browser.component'

const routes: Routes = [
  {
    path: '',
    component: ListBrowserComponent,
    data: {
      title: 'List',
      icon: 'ti-layers',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBrowserRouting { }
