import { Component, OnInit } from '@angular/core';
import {ApicallService} from '../../apicall.service'
import { Router,ActivatedRoute } from '@angular/router';
// import {PartyRoutingModule} from './party-routing.module'
import { Current } from '../../Common';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {

 
  constructor(private tData:ApicallService, private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['PartyId'] != "" && param['PartyId'] != undefined)
      {
        this.title = "Edit party"
        this.type = "EditParty"
        this.getSchool(param['PartyId'])
      }
    })
   } 
     
   title="Party"
   type= "NewParty"
   current = new Current()
  myvar:any = {PartyId: null,
  PartyName:null,
  MobileNo:null,
  Address:null,
  AadharNo:null,
  VichleNo:null,
  GRRNo:null,
  EwayBillNo:null,
  GstNo:null,
  Dl1:null,
  Dl2:null



  }

  ngOnInit() {
  }

  getSchool(PartyId)
  {
    let qry = "Select * from party where PartyId = "+PartyId
    this.tData.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
      this.myvar = data ['data'][0]
     
    })
  }
  ready(){
    if(this.type == "NewParty")
    {
        let rd = true
         
         
          if(rd){
            this.tData.saveparty(this.myvar,this.myvar.PartyId).subscribe(res=>{
             alert("Party Saved");
    
            })
          }
        }else{
          {
            let updateQry = this.current.generateUpdateQuery(
              [this.myvar],
              ["PartyId"],
              ["PartyId"],
              "",
              "party"
              )
            
              this.tData.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
                alert("Party detail updated")
                
              },(err)=>{
                console.log(err)
                alert("Error while updating Party detail")
              })
          }
        }

        }

}
