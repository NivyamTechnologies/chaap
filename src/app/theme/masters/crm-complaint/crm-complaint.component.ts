import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Current } from '../../Common';


@Component({
  selector: 'app-crm-complaint',
  templateUrl: './crm-complaint.component.html',
  styleUrls: ['./crm-complaint.component.scss']
})
export class CrmComplaintComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['customer_id'] != "" && param['customer_id'] != undefined)
      {
        debugger
        this.title = "Edit Customer"
        this.type = "EditCustomer"
        this.entry =param['entry']
        if(param['entry']=='complaint'){
          
          this.getcrmccoplaint(param['customer_id'])
        }
        else{
          this.getcrmcustomer(param['customer_id'])
        }

      }
    })
   }

  ngOnInit() {
  }

  title="Customer"
  type= "NewSchool"
  entry=''
  dataColumns:any;
  dataRows:any
  closecaseval=false
  current = new Current()
  model = {
    "complaint_id" : 10,
    "customer_id" : '',
    "CreateDate" : '',
    "remarks" : '',
    "mobile_no" : '',
    "status" : 'Open',
    "type" : 'Complaint'
  }

  getcrmcustomer(customer_id)
  {
    let qry = "Select * from customer where customer_id = "+customer_id
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
    this.model = data ['data'][0]
    this.model['complaint_id']= Math.floor(Math.random() * 9000000000) + 1000000000;
    let date = new Date().toISOString().split('T')[0]
    this.model['CreateDate'] = date
    this.model['type'] = 'Complaint'
    this.model['status'] = 'Open'
     
    })
  }

  getcrmccoplaint(id){
    let qry = "Select * from  complaint left join customer on complaint.customer_id =customer.customer_id where complaint_id = "+id
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
    this.model = data ['data'][0]
    let date = new Date().toISOString().split('T')[0]
    this.model['CreateDate'] = date
     
    })
  }

  submit()
  {
        if(this.entry=='customer'){
          this.api.saveMasterDefinition("crmcomplaint",{complaint : [this.model]}).subscribe(()=>{
            alert("complaint saved")
            this.route.navigateByUrl('/forms/CrmComplaintBrowser')
          },err=>{
            alert("Error while saving customer")
          })
        }
        else{

          let updateQry = this.current.generateUpdateQuery(
            [this.model],
            ["complaint_id","name","mobile_no","alt_mobile_no","city","address","area","Model","Brand","SerialNo","PinCode","email"],
            ["complaint_id"],
            "",
            " complaint"
            )
          
            this.api.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
              alert("Complain saved")
              this.route.navigateByUrl('/forms/CrmComplaintBrowser')
            },(err)=>{
              console.log(err)
              alert("Error while updating customer detail")
            })
        }

      
    
    

  }

  viewhistory(id){
    let qry = "Select * from  complaint  where customer_id = "+this.model['customer_id']
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      this.dataColumns = [
        {"name" : "complaint Id", "prop" : "complaint_id"},
        {"name" : "Call Type", "prop" : "type"},
        {"name" : "Create Date", "prop" : "CreateDate"},
        {"name" : "Close Date", "prop" : "CreateDate"},
        {"name" : "status", "prop" : "status"},
        {"name" : "Product", "prop" : "Product"}
    ]
      this.dataRows = data['data']
      this.dataRows = [...this.dataRows]
     
    })

  }

}

