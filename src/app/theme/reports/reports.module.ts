import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxReportComponent } from './tax-report/tax-report.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportRoutingModule } from './reports-routing.module';
import { StockreportComponent } from './stockreport/stockreport.component';
import { StockvaluereportComponent } from './stockvaluereport/stockvaluereport.component';

@NgModule({
  declarations: [TaxReportComponent, StockreportComponent, StockvaluereportComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    SharedModule,
    ReportRoutingModule
  ]
})
export class ReportsModule { }
