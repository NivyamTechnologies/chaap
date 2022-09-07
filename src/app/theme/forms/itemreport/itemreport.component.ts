import { Component, OnInit,ViewChild } from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itemreport',
  templateUrl: './itemreport.component.html',
  styleUrls: ['./itemreport.component.scss']
})
export class ItemreportComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private tData:ApicallService,private route : Router) { 
    
  }
  mydata =[];

  ngOnInit() {
   
    this.sql1('select * from item').subscribe(res=>{
      
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
  edititem(row)
  {
    this.route.navigate(['forms/item',{'ItemId' : row['ItemId']}])
  }

  deleteItem(ItemId,rowIndex)
  {
    let qry = "Delete from item where ItemId = "+ItemId
    this.tData.Post("/users/executeSelectStatement",{Query : qry}).subscribe(()=>{
      alert("Item delete Successfully")
      this.mydata.splice(rowIndex,1)
      this.mydata = [...this.mydata]
    })
  }


  exportToExcel()
  {
    let qry = "Select * from item"
    this.tData.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.tData.exportToExcel(data['data'],"Item")
    })
  }


}