import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooklistComponent} from './booklist.component'

const routes: Routes = [
  {
    path: '',
    component: BooklistComponent,
    data: {
      title: 'Add list',
      icon: 'ti-layers',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookListRoutingModule { }
