import { Component, OnInit ,ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service'

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  mydata =[];
  
  fullScreenRow = [];
  loadingIndicator = true;
  reorderable = true;
  editing = {};
  columns = [
    { prop: 'ItemId',name:'ItemId' },
    { prop: 'ItemName',name:'ItemName' },
    { prop: 'Qty',name:'Qty' },
    
  ];
  val:any ='';
  date1:any=''
val1:any='';
party:any='';
BillNo:any='';
totalamount:any;
item:any='';
detail:any;
header:any;
  rows = [];
  expanded = {};
  timeout: any;

  rowsFilter = [];
  tempFilter = [];
  constructor(private tData:ApicallService) { 


    // this.fetchBasicData((data) => {
    //   this.rowsBasic = data;
    //   setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // });

   
  }

  ngOnInit() {
   

    
      this.sdd();
      this.sdd1();
      let date = new Date().toISOString().split('T')[0]
      this.date1= date
    // this.date1 = new Date();

  }
  sql1(data){
    let tbody = new URLSearchParams();
    tbody.set('ProfileId', this.tData.ProfileId);
    let mbody = {'Query':data}
    debugger
    return this.tData.localsqlser(tbody,mbody)
  }
  sdd(){
    this.val=''
    this.sql1('Select PartyId, PartyName from party').subscribe(res=>{
      this.party = Object.values(res)[0];
    })
  }
  sdd1(){
    this.val1=''
    this.sql1('Select ItemId, ItemName from item where Active="Y"').subscribe(res=>{
      this.item = Object.values(res)[0];
    })
  }
   
getItem(){
  debugger
  this.tData.fetch(this.val1).subscribe(res=>{
console.log(res);
    this.mydata.push(Object.values(res)[0][0]);
    this.mydata=[...this.mydata]
    console.log(this.mydata);
  })



  
}

updateValue(event, cell, rowIndex) {
  debugger
  console.log('inline editing rowIndex', rowIndex)
  this.editing[rowIndex + '-' + cell] = false;
  this.mydata[rowIndex][cell] = event.target.value;
 if(this.mydata[rowIndex]['disper'] == null){
  this.mydata[rowIndex]['disper'] = 0;
 }
 let yy =((this.mydata[rowIndex]["Qty"] *this.mydata[rowIndex]["purchaseprice"] 
 -((this.mydata[rowIndex]["purchaseprice"]*this.mydata[rowIndex]["Qty"] )*this.mydata[rowIndex]['disper'])/100));
  this.mydata[rowIndex]["Total"] = yy+((yy )*this.mydata[rowIndex]['tex_rate'])/100;
  this.totalamount=0;
  this.mydata.forEach(rr => {
  this.totalamount += rr["Total"];
 });

  console.log(event,cell)
  this.mydata = [...this.mydata];
  console.log('UPDATED!', this.mydata[rowIndex][cell]);
}

getDomain(){

this.header =[this.totalamount,this.val,this.date1,this.BillNo];
this.detail = [];
this.mydata.forEach(foo => {

  foo['netrate'] = foo['purchaseprice']* foo['Qty']
  foo['totalamount'] = foo['Total']
  foo['CreatedDate'] = this.date1
  foo['ItemSeq']= 1
  foo['DocId']= 45
  foo['DocNo']= ''

  
});
this.detail = this.mydata;

console.log(this.mydata);
this.tData.savepurchase(this.header,this.detail).subscribe(res=>{
if(res){
  alert("Saved Document")
}

})


}
  fetchBasicData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/basic.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
