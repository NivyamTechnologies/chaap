import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Current } from '../../Common';

@Component({
  selector: 'app-accountledger',
  templateUrl: './accountledger.component.html',
  styleUrls: ['./accountledger.component.scss']
})
export class AccountledgerComponent implements OnInit {

  constructor(private api : ApicallService,private activatedRoute : ActivatedRoute,private route : Router) { 
    this.activatedRoute.params.subscribe(params=>{
      if(params['LedgerId'] != undefined && params['LedgerId'] != "")
      {
        this.Type = "EditLedger"
        this.getAccountLedger(params['LedgerId'])
      }
    })
  }

  ngOnInit() {
    this.getParty() //Fetch the details from the Id in query params
    this.getcustomer()
  }

  title = "Account Ledger"
  Type = "AddLedger"
  accountLedger = {
    LedgerId : '',
    PartyId : '60000',
    Amount  : '',
    LedgerType : 'Pay',
    Narration : '',
    Mode : 'Bank',
    Date : '',
    CreatedDate : '',
    ModifiedDate : '',
    CustomerId:''
  }
  current = new Current()
  models = {Amount : '',PartyId : '',Narration : ''}
  PartyList = []
  customerList=[]

  getParty() // Fetch the details from Account Ledger
  {
    debugger
    this.api.getList("Party").subscribe((res)=>{
      console.log(res['data'])
      this.PartyList = res['data']
     
    },err=>{
      console.log("error while getting list",err)
    })
  }

  getcustomer() // Fetch the details from Account Ledger
  {
    this.api.getList("Customer").subscribe((res)=>{
      console.log(res['data'])
      this.customerList = res['data']
    },err=>{
      console.log("error while getting list",err)
    })
  }
  getAccountLedger(LedgerId = -1)
  {
    let qry = "Select * from Payment where LedgerId = '"+LedgerId+"'"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.accountLedger = data['data'][0]      
    })
  }



  savebtnClick()
  {
    let errMessage = this.current.isValid(this.models,this.accountLedger)
    if(errMessage == "")
    {
      if(this.Type !="EditLedger")
      {
        this.saveAccountLedger()
      }
      else
      {
        this.updateAccountLedger()
      }
    }
    else
    {
      alert(errMessage)
    }
  }

  saveAccountLedger() // save Account Ledger
  {
    debugger
    this.accountLedger['CreatedDate'] = new Date().toISOString().split('T')[0] //cerated date = date on which ledger is save
    this.api.saveMasterDefinition("Ledger",{'Payment' : [this.accountLedger]}).subscribe((res)=>{
      console.log(res)
      alert("Account Ledger Saved\nLedgerId : "+res)
      this.route.navigateByUrl("/ledgerbrowser")
    },err=>{
      console.log(err)
    })
  }

  updateAccountLedger()// Upddate account ledger
  {
      this.accountLedger['ModifiedDate'] = new Date().toISOString().split('T')[0]
       let updateqry = this.current.generateUpdateQuery([this.accountLedger],["LedgerId"],["LedgerId"],"","Payment")
       console.log("This is update Qry :",updateqry)
       this.api.Post("/users/executeSelectStatement",{Query : updateqry}).subscribe((data)=>{
        console.log(data)
        alert("Account Ledger Updated")
        this.route.navigateByUrl("/ledgerbrowser")
      })
  }
}
