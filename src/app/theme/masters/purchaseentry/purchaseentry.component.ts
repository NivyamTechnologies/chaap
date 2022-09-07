import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { ProcessSale } from '../sale/processSale';
import { SaleOrderProcess } from './processAndUpdateSale';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchaseentry',
  templateUrl: './purchaseentry.component.html',
  styleUrls: ['./purchaseentry.component.scss']
})
export class PurchaseentryComponent implements OnInit {

   
  constructor(private api : ApicallService,private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{
      if(params['SaleId'] != "" && params['SaleId'] !=undefined)
      {
        this.Type="EditSale"
        this.title="Edit Sale"
        this.getSaleDetail(params['SaleId'],params['DocId'])
      }
      else
      {
        let date = new Date().toISOString().split('T')[0]
        this.model['DocDate'] = date
      }
    })
   }

  ngOnInit() {
    this.getItemList()
    this.getSchoolList()

  }
  BillNo:any;
  ItemList = []
  SchoolList = []
  dataRows = []
  selected = [];
  Type="NewSale"
  title="New Sale"
totaldiscount=0;
batchlist=[]
company:any;
  model = {
    DocId : '45',
    DocNo : '',
    PartyId : '',
    Total : '',
    DocDate : '',
    BillNo:'',
    taxamount:''
  }
  
  saveSale = new ProcessSale(this.api)
  processSale = new SaleOrderProcess(this.api)
  
  getItemList()
  {
    let qry = "Select * from item where Active='Y'" 
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(item=>{
     this.ItemList = item['data']
     console.log("Item List :",item)
    })
  }

  getSchoolList()
  {
    let qry = "Select PartyId, PartyName from party"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(school=>{
      this.SchoolList = school['data']
      if(  this.Type=="EditSale"){

      }else{
      this.model['PartyId'] = this.SchoolList[0]['PartyId']
      }
     
     
      
    
     })

   
  }

  addrow()
  {
    let saleDetailModel = {
      'ItemId' : this.ItemList[0]['ItemId'],
      'rate' : this.ItemList[0]['purchaseprice'],
      'dis' : 0,
      'Qty' : 1,
      'batch_no':'',
      'netrate' : this.ItemList[0]['purchaseprice'],
      'tex_rate' : this.ItemList[0]['tex_rate'],
      'taxvalue' : this.ItemList[0]['taxvalue']
    }
   debugger
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


  updateItem(index,col,value)
  {
   
   
      this.dataRows[index][col] = value
      this.updateRow(index)
  
   
  }

  onSelect({ selected }) {
    debugger
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
    debugger
    let ItemId = this.dataRows[index]['ItemId']
    this.ItemList.forEach(item=>{
      if(item['ItemId'] == ItemId)
      {
        
      
        this.dataRows[index]['rate'] = item['rate']
        
        this.dataRows[index]['Qty'] = item['Qty']
        this.dataRows[index]['tex_rate'] = item['tex_rate']
   
        // this.dataRows[index]['taxamount'] = Number( item['rate'])* Number(item['Qty'])
      }
    })
    this.updateNetPrice(index)
  }

  
  updateRow1(index)
  {
    debugger
    let ItemId = this.dataRows[index]['ItemId']
    this.ItemList.forEach(item=>{
      if(item['ItemId'] == ItemId)
      {
        
       
        this.dataRows[index]['tex_rate'] = item['tex_rate']
        this.dataRows[index]['HsnCode'] = item['HsnCode']
        this.dataRows[index]['taxamount'] = Number( item['rate'])* Number(item['Qty'])
      }
    })
    this.updateNetPrice(index)
  }


  

  updateNetPrice(index)
  {
    let amount = 0
    let rate  = Number(this.dataRows[index]['rate'])
    let quantity = Number(this.dataRows[index]['Qty'])
    let tax = Number(this.dataRows[index]['tex_rate'])
    let disc =  Number(this.dataRows[index]['dis'])

if(disc>0){
  this.dataRows[index]['discrate'] = rate*(disc)/100;
  
  rate = rate-(rate*(disc)/100)
 

}
    let tax_amount = (rate * (tax)/100)    
    this.dataRows[index]['netrate'] = String(((rate+tax_amount)*quantity).toFixed(2))
    this.dataRows[index]['totalamount'] = String(((rate+tax_amount)*quantity).toFixed(2))
    this.dataRows[index]['taxamount'] = String((tax_amount*quantity).toFixed(2))
    this.dataRows[index]['DocId'] =45
    this.dataRows = [...this.dataRows]
    this.updateTotaltax()
    this.updateTotalAmount()
  }

  updateTotalAmount()
  {
    let totalamount = 0
    this.dataRows.forEach(row=>{
      totalamount += Number(row['netrate'])
    })
    this.model['Total'] = String(totalamount.toFixed(2))
    
    
  }

  updateTotaltax()
  {
    let taxamount = 0
    this.dataRows.forEach(row=>{
      taxamount += Number(row['taxamount'])
    })
    this.model['taxamount'] = String(taxamount.toFixed(2))
    
    
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
    this.dataRows.forEach(row=>{
      let count = 0
    
    //  this.totaldiscount = this.totaldiscount;//+row['discrate'];
      this.dataRows.forEach(nextRow=>{
          if(Number(row['ItemId']) == Number(nextRow['ItemId']))
          {
            count++;
          }
          if(count > 1)
          {
            valid = false;
            errorMessage ="Multiple Item with same name"
          }
      })
    })
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
    
   let header =[this.model.Total,this.model['PartyId'],this.model['DocDate'],this.BillNo,this.model['taxamount']];
    this.api.savepurchase(header,this.dataRows).subscribe(res=>{
      if(res){
        alert("Saved Document")
      }
      
      })
    
    
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  //for updating Sale
  getpurchase(SaleId,DocNo)
  {
      let qry = 'Select * from t_doc_header where DocId='+DocNo+' and DocNo = '+SaleId+";select t1.*,t2.ItemName from t_doc_detail t1 inner join item t2 on t1.ItemId = t2.ItemId where t1.DocId="+DocNo+" and t1.DocNo =  "+SaleId
      console.log(qry);
      return this.api.Get("/total/execMultipleQuery",["Query="+qry])
  }
  getSaleDetail(SaleId,DocNo)
  {
    this.getpurchase(SaleId,DocNo).subscribe(data=>{
      this.model = data[0]['data'][0]
      this.model['PartyId']  =this.model['PartyId'];
      this.BillNo = this.model['BillNo'];
      this.dataRows = data[1]['data']
    
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
    debugger
      localStorage.setItem("invoice",JSON.stringify({"form":this.model,"table":this.dataRows})) // storing data to print on invoice
      this.route.navigateByUrl('/print/newprint') // taking to the invoice print page
  }
}
