import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crm-complaint-browser',
  templateUrl: './crm-complaint-browser.component.html',
  styleUrls: ['./crm-complaint-browser.component.scss']
})
export class CrmComplaintBrowserComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
    this.getdata()
  }
  dataColumns = []
  dataRows = []
  selectfield='complaint_id'
  loading:boolean= false;
  txtz:any
  getdata()
  {debugger
    this.api.Post("/total/getBrowser",{Condition : "where 1=1"},["EntityName=CrmComplaint"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  editSchool(row)
  {
    this.route.navigate(['/forms/CrmComplaint',{'customer_id' : row['complaint_id'],'entry':'complaint'}])
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
  let qry = ` Select * from  complaint left join customer on complaint.customer_id =customer.customer_id where ${this.selectfield} like '%${this.txtz}' or ${this.selectfield} like '${this.txtz}%' or ${this.selectfield} like '%${this.txtz}'`
  this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
    
   
  debugger
    this.dataColumns = [
      {"name" : "complaint Id", "prop" : "complaint_id"},
      {"name" : "name", "prop" : "name"},
      {"name" : "CreateDate", "prop" : "CreateDate"},
      {"name" : "status", "prop" : "status"},
      {"name" : "type", "prop" : "type"},
      {"name" : "remarks", "prop" : "remarks"}
  ]

    this.dataRows = data['data']
    this.dataRows = [...this.dataRows]
    this.loading=false;
  })
  }
}
