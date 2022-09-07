import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-schallanbrowser',
  templateUrl: './schallanbrowser.component.html',
  styleUrls: ['./schallanbrowser.component.scss']
})
export class SchallanbrowserComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
    this.getdata()
  }

  dataRows = []
  dataColumns = [
    {name : 'Customer Name',prop : 'CustomerName'},
    {name : 'Id', prop : 'SchoolId'},

    {name : 'Total Amount', prop : 'TotalAmount'},
    {name : 'Discount', prop : 'discount'},
    {name : 'Net Price', prop : 'NetPrice'},
    {name : 'Created Date', prop : 'CreatedDate'}
  ]

  getdata()
  {
   
    this.api.Post("/total/getBrowser",{Condition : "where DocNo=28 "},["EntityName=Sale"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  editSale(row)
  {
   
   let   route='/salechallan'
    
    this.route.navigate([route,{SaleId : row['SaleId'],DocNo:'28'}])
  }

  deleteSale(SaleId,rowIndex)
  {
    let qry = "Delete from t_sale_master where DocNo=28 and SaleId = "+SaleId
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(()=>{
      alert("Sale delete Successfully")
      this.dataRows.splice(rowIndex,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select * from t_sale_master where DocNo=28"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"Sale")
    })
  }

}
