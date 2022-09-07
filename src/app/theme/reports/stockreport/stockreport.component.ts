import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
@Component({
  selector: 'app-stockreport',
  templateUrl: './stockreport.component.html',
  styleUrls: ['./stockreport.component.scss']
})
export class StockreportComponent implements OnInit {

  constructor(private api : ApicallService) { }

  ngOnInit() {
    this.getReport()

  }

 dataRows = []
  dataColumns = []
  from = new Date().toISOString().split('T')[0]
  to = new Date().toISOString().split('T')[0]
  getReport()
  {
    this.api.Post("/total/getBrowser",{Condition : ""},["EntityName=StockReport","Type=Report"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
      this.api.exportToExcel(this.dataRows,"StockReport")
  }

}
