import { Component, OnInit ,ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service'

@Component({
  selector: 'app-purchasereport',
  templateUrl: './purchasereport.component.html',
  styleUrls: ['./purchasereport.component.scss']
})
export class PurchasereportComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private tData:ApicallService) { 
    
  }
  mydata =[];

  ngOnInit() {
   
    this.sql1('SELECT t_doc_header.DocNo,t_doc_header.BillNo,party.PartyName,Total,DocDate from t_doc_header left join party on t_doc_header.PartyId= party.PartyId order by t_doc_header.DocNo desc').subscribe(res=>{
      
    this.mydata=Object.values(res)[0];
    
    console.log(this.mydata);
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
