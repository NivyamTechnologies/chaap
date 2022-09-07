import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crm-customer-browser',
  templateUrl: './crm-customer-browser.component.html',
  styleUrls: ['./crm-customer-browser.component.scss']
})
export class CrmCustomerBrowserComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
    this.getdata()
  }
  dataColumns = []
  dataRows = []
  selectfield='mobile_no'
  loading:boolean= false;
  txtz:any=''
  getdata()
  {debugger
    this.api.Post("/total/getBrowser",{Condition : "where 1=1"},["EntityName=CrmCustomer"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  editSchool(row)
  {
    this.route.navigate(['/forms/CrmCustomer',{'customer_id' : row['customer_id']}])
  }

  addcomplaint(row)
  {
    this.route.navigate(['/forms/CrmComplaint',{'customer_id' : row['customer_id'],'entry':'customer'}])
  }

  deleteSale(customer_id,rowIndex)
  {
    let qry = "Delete from customer where customer_id = "+customer_id
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(()=>{
      alert("customer delete Successfully")
      this.dataRows.splice(rowIndex,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select * from customer"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"School")
    })
  }

srch(){
this.loading=true;
let qry = ` Select * from customer where ${this.selectfield} like '%${this.txtz}' or ${this.selectfield} like '${this.txtz}%' or ${this.selectfield} like '%${this.txtz}'`
this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
  
 
debugger
  this.dataColumns = [
    {"name" : "Customer Name", "prop" : "name"},
    {"name" : "Mobile No", "prop" : "mobile_no"},
    {"name" : "Model", "prop" : "Model"},
    {"name" : "Brand", "prop" : "Brand"},
    {"name" : "SerialNo", "prop" : "SerialNo"},
    {"name" : "address", "prop" : "address"}
]
  this.dataRows = data['data']
  this.dataRows = [...this.dataRows]
  this.loading=false;
})
}
}