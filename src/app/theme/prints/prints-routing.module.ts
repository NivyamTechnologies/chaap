import {NgModule} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import { InvoiceComponent } from './invoice/invoice.component'
import { NewprintComponent } from './newprint/newprint.component'

const routes : Routes = [{
    path : '',
    children : [
        {
            path : 'invoice',
            component : InvoiceComponent,
           
        },
        {
            path : 'newprint',
            component : NewprintComponent,
           
        }
    ]
}]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class PrintRoutingModule{}