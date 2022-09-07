import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Current } from '../../Common';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['SchoolId'] != "" && param['SchoolId'] != undefined)
      {
        this.title = "Edit Customer"
        this.type = "EditSchool"
        this.getSchool(param['SchoolId'])
      }
    })
   }

  ngOnInit() {
  }

  title="Customer"
  type= "NewSchool"
  current = new Current()
  model = {
    "SchoolId" : '',
    "SchoolName" : '',
    "Address" : '',
    "Contact" : '',
    "discount" : '',
    "gstno" : '',
    "panno" : '',
    "AadharNo":'',
  "VichleNo":'',
  "GRRNo":'',
  "EwayBillNo":'',
  "shippaadharno":'',
  "Transport":'',
  "shippaddress":'',
  "shippgstno":'',
  "shipppanno":'',
  "shippname":''

  }

  getSchool(SchoolId)
  {
    let qry = "Select * from t_school_master where SchoolId = "+SchoolId
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
      this.model = data ['data'][0]
     
    })
  }

  submit()
  {
    if(this.isValid())
    {
      if(this.type == "NewSchool")
      {
        this.api.saveMasterDefinition("School",{t_school_master : [this.model]}).subscribe(()=>{
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
          ["SchoolId"],
          ["SchoolId"],
          "",
          "t_school_master"
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

  isValid()
  {
   
    let valid = true
    let message = ""
    if(this.model['SchoolName'] == "")
    {
      message += "customer Name can't be empty\n"
      valid = false
    }
    var regx= "^[0-9]{2}[A-Z]{5}"
    "[0-9]{4}[A-Z]{1}["
    "1-9A-Z]{1}Z[0-9A-Z]{1}$";
    if(this.model['gstno'] != ""){
      if (this.model['gstno'] .match(regx)) {
        
      } else {
        message += "Gst No is not valid\n"
        valid = false
      }
    }
   

    if(!valid)
    {
      alert(message)
    }

    return valid
  }
}
