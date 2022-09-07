import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-purchasechallan',
  templateUrl: './purchasechallan.component.html',
  styleUrls: ['./purchasechallan.component.scss']
})
export class PurchasechallanComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
    this.getdata()
  }

  dataRows = []
  dataColumns = [
    {name : 'Customer Name',prop : 'CustomerName'},
    {name : 'Id', prop : 'SchoolId'},
    {name : 'ListId', prop : 'ListId'},
    {name : 'Total Amount', prop : 'total'},
    {name : 'Discount', prop : 'discount'},
    {name : 'Net Price', prop : 'NetPrice'},
    {name : 'Created Date', prop : 'CreatedDate'}
  ]

  getdata()
  {
   
    this.api.Post("/total/getBrowser",{Condition : "where DocId=45 "},["EntityName=Purchase"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  editSale(row)
  {
   
     let route='/purchasechaalan'
    
    this.route.navigate([route,{SaleId : row['DocNo'],DocId:'45'}])
  }

  deleteSale(SaleId,rowIndex)
  {
    let qry = "Delete from t_sale_master where DocNo=27 and SaleId = "+SaleId
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

}
