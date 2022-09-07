import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Current } from '../../Common';

@Component({
  selector: 'app-crm-customer',
  templateUrl: './crm-customer.component.html',
  styleUrls: ['./crm-customer.component.scss']
})
export class CrmCustomerComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['customer_id'] != "" && param['customer_id'] != undefined)
      {
        this.title = "Edit Customer"
        this.type = "EditCustomer"
        this.getSchool(param['customer_id'])
      }
    })
   }

  ngOnInit() {
  }

  title="Customer"
  type= "NewSchool"
  current = new Current()
  model = {
    "customer_id" : '',
    "name" : '',
    "address" : '',
    "mobile_no" : '',
    "alt_mobile_no" : '',
    "email" : '',
    "city" : '',
    "area":null,
  "Model":null,
  "Brand":null,
  "SerialNo":null,
  "PinCode":null
  }

  getSchool(customer_id)
  {
    let qry = "Select * from customer where customer_id = "+customer_id
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
      this.model = data ['data'][0]
     
    })
  }

  submit()
  {

      if(this.type == "NewSchool")
      {
        this.api.saveMasterDefinition("crmcustomer",{customer : [this.model]}).subscribe(()=>{
          alert("customer saved")
          this.route.navigateByUrl('/schoolbrowser')
        },err=>{
          alert("Error while saving customer")
        })
      }
      else
      {
        let updateQry = this.current.generateUpdateQuery(
          [this.model],
          ["customer_id"],
          ["customer_id"],
          "",
          "customer"
          )
        
          this.api.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
            alert("customer detail updated")
            this.route.navigateByUrl('/schoolbrowser')
          },(err)=>{
            console.log(err)
            alert("Error while updating customer detail")
          })
      }
    

  }


}

