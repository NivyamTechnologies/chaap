import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
@Component({
  selector: 'app-stockvaluereport',
  templateUrl: './stockvaluereport.component.html',
  styleUrls: ['./stockvaluereport.component.scss']
})
export class StockvaluereportComponent implements OnInit {


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
    this.api.Post("/total/getBrowser",{Condition : ""},["EntityName=StockvalueReport","Type=Report"]).subscribe(data=>{
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
