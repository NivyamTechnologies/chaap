import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';
import { SaleOrderProcess } from '../../masters/newsaleorder/processAndUpdateSale';
@Component({
  selector: 'sale-browser',
  templateUrl: './sale-browser.component.html',
  styleUrls: ['./sale-browser.component.scss']
})
export class SaleBrowserComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
    this.getdata()
  }

  dataRows = []
  model=[]
  rows=[]
  processSale = new SaleOrderProcess(this.api)
  dataColumns = [
    {name : 'Customer Name',prop : 'CustomerName'},
    {name : 'Id', prop : 'SchoolId'},
    {name : 'ListId', prop : 'ListId'},
    {name : 'Total Amount', prop : 'TotalAmount'},
    {name : 'Discount', prop : 'discount'},
    {name : 'Net Price', prop : 'NetPrice'},
    {name : 'Created Date', prop : 'CreatedDate'}
  ]

  getdata()
  {
   
    this.api.Post("/total/getBrowser",{Condition : "where DocNo=27 order by SaleId desc"},["EntityName=Sale"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  editSale(row)
  {
   
     let route='/saleorder'
    
    this.route.navigate([route,{SaleId : row['SaleId'],DocNo:'27'}])
  }

  deleteSale(SaleId,rowIndex)
  {
    debugger
    let qry = `Delete from t_sale_master where DocNo=27 and SaleId = ${SaleId};Delete from t_sale_detail where DocNo=27 and SaleId = ${SaleId};`
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(()=>{
      alert("Sale delete Successfully")
      this.dataRows.splice(rowIndex,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select * from t_sale_master where DocNo=27"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"Sale")
    })
  }

  printsale(SaleId)
  {
      this.processSale.getSale(SaleId,27).subscribe(data=>{
      this.model = data[0]['data'][0]
      this.model['SchoolId']  =this.model['SchoolId'].toString();
      this.rows = data[1]['data']
      this.processSale.setOldDataRow(JSON.parse(JSON.stringify(data[1]['data'])))

      localStorage.setItem("invoice",JSON.stringify({"form":this.model,"table":this.rows})) // storing data to print on invoice
      this.route.navigateByUrl('/print/newprint') // taking to the invoice print page
    })
  }

}
