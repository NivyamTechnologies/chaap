import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { ProcessSale } from '../sale/processSale';
import { SaleOrderProcess } from './processAndUpdateSale';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-newsaleorder',
  templateUrl: './newsaleorder.component.html',
  styleUrls: ['./newsaleorder.component.scss']
})
export class NewsaleorderComponent implements OnInit {

  constructor(private api : ApicallService,private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{
      if(params['SaleId'] != "" && params['SaleId'] !=undefined)
      {
        this.Type="EditSale"
        this.title="Edit Sale"
        this.getSaleDetail(params['SaleId'],params['DocNo'])
      }
      else
      {
        let date = new Date().toISOString().split('T')[0]
        this.model['CreatedDate'] = date
      }
    })
   }

  ngOnInit() {
    this.getItemList()
    // this.getSchoolList()
    this.getitemcode()
    this.getlastbill()

  }
  challanlist=[]
  ItemList = []
  completelist=[]
  SchoolList = []
  dataRows = []
  selected = [];
  Type="NewSale"
  title="New Sale"
totaldiscount=0;
batchlist=[]
company:any;
ItemCode=[];
  model = {
    SaleId : '',
    CustomerName : 'cash',
    BillNo : '',
    SchoolId:'1',
    DocNo : '27',
    TotalAmount : '',
    discount : '',
    NetAmount : '',
    CreatedDate : '',
    taxtype:'cgst',
    taxamount:'',
    billtype:'Table',
    CustomerMobile:'',
    CustomerAddress:''
  }
  
  saveSale = new ProcessSale(this.api)
  processSale = new SaleOrderProcess(this.api)
  
  getItemList()
  {
    let qry = "Select ItemId,ItemName,Qty,rate,tex_rate,HsnCode,ItemCode from item where Active='Y'" 
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(item=>{
      this.completelist =item['data'];
      let matchedJobList = [];
      let unMatchedJobList = [];
     matchedJobList =  this.completelist.filter(function (e) {
      return e.ItemCode == 'burger';
  });
unMatchedJobList =  this.completelist.filter(function (e) {
    return e.ItemCode != 'burger';
});

  this.ItemList= [...matchedJobList, ...unMatchedJobList];
    })
  }

  getitemcode()
  {
    let qry = "Select ItemCode from item group by ItemCode;" 
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(itemcode=>{
     this.ItemCode = itemcode['data']
     
    })
  }

  getcustomerdetail(){
    let qry = "SELECT CustomerName,CustomerAddress FROM t_sale_master where CustomerMobile="+this.model['CustomerMobile'] 
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(detail=>{
     this.model['CustomerName'] = detail['data'][0].CustomerName
     this.model['CustomerAddress'] = detail['data'][0].CustomerAddress
    })
  }
  
  getlastbill()
  {
    let qry = "SELECT BillNo FROM t_sale_master ORDER BY SaleId DESC LIMIT 1;" 
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(itemcode=>{
     this.model['BillNo'] = itemcode['data'][0].BillNo+1
    })
  }

  

  updateitemlist(value){
    let matchedJobList = [];
    let unMatchedJobList = [];
   matchedJobList =  this.completelist.filter(function (e) {
    return e.ItemCode == value;
});
unMatchedJobList =  this.completelist.filter(function (e) {
  return e.ItemCode != value;
});

this.ItemList= [...matchedJobList, ...unMatchedJobList];
  }




  addrow()
  {
    let matchedJobList = [];
    let unMatchedJobList = [];
   matchedJobList =  this.completelist.filter(function (e) {
    return e.ItemCode == 'burger';
});
unMatchedJobList =  this.completelist.filter(function (e) {
  return e.ItemCode != 'burger';
});

this.ItemList= [...matchedJobList, ...unMatchedJobList]

    let saleDetailModel = {
      'ItemId' : this.ItemList[0]['ItemId'],
      'rate' : this.ItemList[0]['rate'],
      'Quantity' : 1,
      'freeqty':0,
      'disc' : 0,
      'discrate':0,
      'HsnCode' : this.ItemList[0]['HsnCode'],
      'Qty' : this.ItemList[0]['Qty'],
      'NetPrice' : this.ItemList[0]['rate'],
      'tex_rate' : this.ItemList[0]['tex_rate'],
      'taxamount' : this.ItemList[0]['taxamount'],
      'ItemCode' : this.ItemCode[0]['ItemCode'],
    }
   
    this.dataRows.push(saleDetailModel)
    this.dataRows = [...this.dataRows]
    this.updateNetPrice(this.dataRows.length-1)
    this.updateTotalAmount()
    console.log("Added Sale detail model : ",saleDetailModel)
  }

  deleterow(index)
  {
    this.dataRows.splice(index,1)
    this.dataRows = [...this.dataRows]
    this.updateTotalAmount()
    this.updateTotaltax()
  }
customerchange(){

let i =  this.model.SchoolId;

this.model['CustomerName'] = this.SchoolList.filter(x => x.SchoolId== i)[0].SchoolName;

// let gstno = this.SchoolList.filter(x => x.SchoolId== i)[0].gstno;

// if(gstno.slice(0, 2)==this.company['GSTIN'].slice(0, 2)){
//   this.model['taxtype'] = 'cgst';

// }
// else{
//   this.model['taxtype'] = 'igst';
// }

}

  updateItem(index,col,value)
  {
    
      this.dataRows[index][col] = value
      this.updateRow(index)
    
    
    
    
   
  }

  onSelect({ selected }) {
    
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }



  update(index,col,value)
  {
    this.dataRows[index][col] = value
    this.updateRow(index)
  }
  update1(index,col,value)
  {
    this.dataRows[index][col] = value
    this.updateRow1(index)
  }

  updateRow(index)
  {
    
    let ItemId = this.dataRows[index]['ItemId']
    this.ItemList.forEach(item=>{
      if(item['ItemId'] == ItemId)
      {
        
      
        this.dataRows[index]['rate'] = item['rate']
        
        this.dataRows[index]['Qty'] = item['Qty']
        this.dataRows[index]['tex_rate'] = item['tex_rate']
        this.dataRows[index]['HsnCode'] = item['HsnCode']
        // this.dataRows[index]['taxamount'] = Number( item['rate'])* Number(item['Qty'])
      }
    })
    this.updateNetPrice(index)
  }

  
  updateRow1(index)
  {
    
    let ItemId = this.dataRows[index]['ItemId']
    this.ItemList.forEach(item=>{
      if(item['ItemId'] == ItemId)
      {
        
        this.dataRows[index]['Qty'] = item['Qty']
        this.dataRows[index]['tex_rate'] = item['tex_rate']
        this.dataRows[index]['HsnCode'] = item['HsnCode']
        // this.dataRows[index]['taxamount'] = Number( item['rate'])* Number(item['Qty'])
      }
    })
    this.updateNetPrice(index)
  }


  

  updateNetPrice(index)
  {
    let amount = 0
    let rate  = Number(this.dataRows[index]['rate'])
    let quantity = Number(this.dataRows[index]['Quantity'])
    let tax = 0
    let disc =  Number(this.dataRows[index]['disc'])

if(disc>0){
  this.dataRows[index]['discrate'] = rate*(disc)/100;
  
  rate = rate-(rate*(disc)/100)
 

}
    let tax_amount = (rate * (tax)/100)
    this.dataRows[index]['NetPrice'] = String(((rate+tax_amount)*quantity).toFixed(2))
    this.dataRows[index]['taxamount'] = String((tax_amount*quantity).toFixed(2))
    this.dataRows[index]['DocNo'] = '27'
    this.dataRows = [...this.dataRows]
    this.updateTotaltax()
    this.updateTotalAmount()
  }

  updateTotalAmount()
  {
    let totalamount = 0
    this.dataRows.forEach(row=>{
      totalamount += Number(row['NetPrice'])
    })
    this.model['TotalAmount'] = String(totalamount.toFixed(2))
    
    this.applydiscount()
  }

  updateTotaltax()
  {
    let taxamount = 0
    this.dataRows.forEach(row=>{
      taxamount += Number(row['taxamount'])
    })
    this.model['taxamount'] = String(taxamount.toFixed(2))
    
    
  }

 applydiscount()
 {
    let discount = Number(this.model['discount'])
    let totalamount = Number(this.model['TotalAmount'])
    let discountamount = totalamount * (discount/100)
    this.model['discount'] = String(discountamount.toFixed(2))
    this.model['NetAmount'] = String((totalamount-discountamount).toFixed(2))
 }

  submit()
  {
    console.log("Sale Model : ",this.model)
    console.log("Sale detail :",this.dataRows)

    if(this.isValid())
    {
      if(this.Type=="NewSale")
      {
        this.processNewSale()
      }
      else
      {
        this.updateSale()
      }
    }
  }

  isValid()
  {
    let valid = true
    let errorMessage = ""
    this.totaldiscount=0;
    //this.dataRows.forEach(row=>{
    //  let count = 0
    
    //  this.totaldiscount = this.totaldiscount;//+row['discrate'];
      // this.dataRows.forEach(nextRow=>{
      //     if(Number(row['ItemId']) == Number(nextRow['ItemId']))
      //     {
      //       count++;
      //     }
      //     if(count > 1)
      //     {
      //       valid = false;
      //       errorMessage ="Multiple Item with same name"
      //     }
      // })
    //})
    if(this.model['CustomerName']=='')
    {
      valid = false;
      errorMessage="\nCustomer Name can't be empty\n"
    }

    if(!valid)
    {
      alert(errorMessage)
    }
    return valid
  }

  processNewSale()
  {
    
   console.log(this.totaldiscount);
   let date = new Date().toISOString()
   this.model['CreatedDate'] = date
   this.model['discount']= (this.totaldiscount).toString();
    this.processSale.insertintoSaleMaster(this.model).subscribe(SaleId=>{
      this.processSale.insertintoSaleDetail(this.dataRows,SaleId).subscribe(data=>{
        this.model['SaleId']= String(SaleId)
        alert("Sale Processed\nSale Id : "+SaleId)
        this.route.navigateByUrl("/salebrowser")
      },err=>{
        console.log("Error while inserting into sale detail")
      })
    },err=>{
      console.log("Error while inserting into Sale Master",err)
    })
    this.processSale.updateItemMaster(this.dataRows)
    
    
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  //for updating Sale

  getSaleDetail(SaleId,DocNo)
  {
    this.processSale.getSale(SaleId,DocNo).subscribe(data=>{
      this.model = data[0]['data'][0]
      this.model['SchoolId']  =this.model['SchoolId'].toString();
      this.dataRows = data[1]['data']
      this.processSale.setOldDataRow(JSON.parse(JSON.stringify(data[1]['data'])))
    })
  }

  updateSale()
  {
    this.processSale.updateSaleMaster(this.model).subscribe(data=>{
      console.log("Updated Sale Master")
    })
    
    this.processSale.updateSaleDetail(this.dataRows,Number(this.model['SaleId'])).subscribe(data=>{
      console.log("old rows deleted from sale detail")
      this.processSale.insertintoSaleDetail(this.dataRows,this.model['SaleId']).subscribe(data=>{
        console.log("new rows inserted into datarows")
        alert("Sale detail updated")
        this.route.navigateByUrl("/salebrowser")
      })
    })

    this.processSale.updateSaleItemQuantity(this.dataRows).subscribe(()=>{
      console.log("Item quantity udpated")
    })
  }

  printInvoice() // function to generate invoice data
  {
    
      localStorage.setItem("invoice",JSON.stringify({"form":this.model,"table":this.dataRows})) // storing data to print on invoice
      this.route.navigateByUrl('/print/newprint') // taking to the invoice print page
  }
}
