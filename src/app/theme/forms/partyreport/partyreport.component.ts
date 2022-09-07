import { Component, OnInit,ViewChild } from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-partyreport',
  templateUrl: './partyreport.component.html',
  styleUrls: ['./partyreport.component.scss']
})
export class PartyreportComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private tData:ApicallService,private route : Router) { 
    
  }
  mydata =[];

  ngOnInit() {
   
    this.sql1('select * from party').subscribe(res=>{
      
    this.mydata=Object.values(res)[0];
    
    console.log(this.mydata);
    })
  }

  editparty(row)
  {
    this.route.navigate(['forms/party',{'PartyId' : row['PartyId']}])
  }
  
  deleteparty(PartyId,rowIndex)
  {
    let qry = "Delete from party where PartyId = "+PartyId
    this.tData.Post("/users/executeSelectStatement",{Query : qry}).subscribe(()=>{
      alert("Party delete Successfully")
      this.mydata.splice(rowIndex,1)
      this.mydata = [...this.mydata]
    })
  }
  sql1(data){
    let tbody = new URLSearchParams();
    tbody.set('ProfileId', this.tData.ProfileId);
    let mbody = {'Query':data}
    debugger
    return this.tData.localsqlser(tbody,mbody)
  }

}