import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ledger-browsers',
  templateUrl: './ledger-browsers.component.html',
  styleUrls: ['./ledger-browsers.component.scss']
})
export class LedgerBrowsersComponent implements OnInit {

  constructor(private api : ApicallService,private route : Router) { }

  ngOnInit() {
    this.getLedgerType()
    this.getcustomer()
 
  }

  dataColumns = [
    {"name" : "Date", "prop" : "date", "width" : "40"}, 
    {"name" : "Party", "prop" : "PartyId", "width" : "50"},
    {"name" : "Narration", "prop" : "Narration", "width" : "50"},
  {"name" : "Debit", "prop" : "total", "width" : "50"},
  {"name" : "Credit", "prop" : "payment", "width" : "30"},
  {"name" : "Balance", "prop" : "Balance", "width" : "30"},

]
  dataRows = []
  ledgerType  = ''
  ledgerType1  = ''
  LedgerTypes = []
  customerList=[]
  editLedger(row)
  {
    this.route.navigate(["/forms/accountledger",{'LedgerId' : row['LedgerId']}])
  }

  getLedgerType()
  {
    let qry = "Select PartyId,PartyName  from party"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(res=>{
      console.log(res)
      this.LedgerTypes = res['data']
    },err=>{
      alert("Error while fetching party")
      this.LedgerTypes = []
    })
  }
  getcustomer()
  {
    this.api.getList("Customer").subscribe((res)=>{
      console.log(res['data'])
      this.customerList = res['data']
    },err=>{
      console.log("error while getting list",err)
    })
  }

  getLedgerBrowser()
  {
    debugger
    if(this.ledgerType1!=""){
      let qry = `select * from (	select SchoolId,NetAmount total,0 payment,concat('Bill No  ',DocNo) Narration,CreatedDate date	from t_sale_master where SchoolId=${this.ledgerType1} UNION ALL select CustomerId PartyId,0 total,Amount,Narration,Date date from  Payment  where CustomerId=${this.ledgerType1})v1  order by date`
      this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
        let bb=0;
        for(let data1 in data['data']){
             bb=  bb+(data['data'][data1].total-data['data'][data1].payment)
             data['data'][data1].Balance=(bb.toFixed(2))
        }
        this.dataRows = data['data']
        this.dataRows = [...this.dataRows]
      })
    }else{
    let qry = `select * from (	select (SELECT PartyName from party where partyId=${this.ledgerType}) PartyId,total,0 payment,concat('Bill No  ',DocNo)
    Narration,DocDate date	from t_doc_header
    where PartyId=${this.ledgerType}
    UNION ALL select (select CompanyName from t_company_master)PartyId ,0 total,Amount,Narration,Date date from  Payment  where PartyId=${this.ledgerType} and LedgerType='Pay'
     UNION ALL select(SELECT PartyName from party where partyId=${this.ledgerType}) PartyId, Amount,0 total,Narration,Date date from  Payment  where PartyId=${this.ledgerType} and LedgerType='Receive')v1  order by date`
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      let bb=0;
      for(let data1 in data['data']){
           bb=  bb+(data['data'][data1].total-data['data'][data1].payment)
           data['data'][data1].Balance=(bb.toFixed(2))
      }
      this.dataRows = data['data']
      this.dataRows = [...this.dataRows]
    })
  }
  }

  deleteLedger(LedgerId = "",index)
  {
    let qry = "delete from Payment where LedgerId =  '"+LedgerId+"'"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.dataRows.splice(index,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {

      this.api.exportToExcel(this.dataRows,"AccountLedger")
    
  }

  
}
