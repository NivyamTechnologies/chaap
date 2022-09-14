import {RouterModule,Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import { TaxReportComponent } from './tax-report/tax-report.component'
import {StockreportComponent} from './stockreport/stockreport.component'
import {StockvaluereportComponent} from './stockvaluereport/stockvaluereport.component'
import { from } from 'rxjs'

const route : Routes = [
    {
        path : '',
        children : [
            {
                path : 'taxreport',
                component : TaxReportComponent,
            
            },
            {
                path : 'stockreport',
                component : StockreportComponent,
                data : {
                    title : 'stock Report',
                    icon : 'ti-layers',
                    status : true
                }

            },
            {
                path : 'stockvaluereport',
                component : StockvaluereportComponent,
                data : {
                    title : 'Item Wise Report',
                    icon : 'ti-layers',
                    status : true
                }

            }
        ]

        // path : '/taxreport',
        // loadChildren 
        // }
        // component : TaxReportComponent,
        // data : {
        //         title : 'Tax Report',
        //         icon : 'ti-layers',
        //         status : true
        //        }
    }
]

@NgModule({
    imports : [RouterModule.forChild(route)],
    exports : [RouterModule]
})

export class ReportRoutingModule{}