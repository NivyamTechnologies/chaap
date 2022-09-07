import { Component, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { getBookNames } from '../../browsers/list-browser/list-browser.component';
import {ProcessSale} from './processSale'
import {updateSale} from './updateSale'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit{

  constructor(private api : ApicallService, private router : Router, private activatedRoute : ActivatedRoute) { 
    this.activatedRoute.params.subscribe(params=>{
      if(String(params['SaleId']).trim() !="" && params['SaleId'] != undefined)
      {
        this.SaleType="Edit"
        this.title="Edit Sale"
        //this.getSale(params['SaleId'])
        this.model['SaleId'] = params['SaleId']
        if(this.SaleType == "Edit")
        {
          this.getSale(this.model['SaleId'],params['DocNo'])
        }
        
      }
      else
      {
        let date = new Date().toISOString().split('T')[0]
        this.model['CreatedDate'] = date
      }
    })
  }

  ngOnInit() {
    this.getSchoolList()
    this.getBookList()
  }
  
  SchoolList = []
  BookList = []
  dropdowns = {'ListId' : '','SchoolId' : ''}
  model = {
            'SaleId':'',
            'CustomerName' : '',
            'ListId' : '',
            'SchoolId' : '',
            'BookIds' : '',
            'TotalAmount' : '',
            'discount' : '',
            'NetAmount' : '',
            'CreatedDate' : ''
          }

  title= "Add New Sale"
  SaleType="New"
  
  dataRows = []
  edt = false
  listBrowser = new getBookNames(this.api); // Object of list-browser component to use book name function
  executeSale = new ProcessSale(this.api); // object of processSale class to use the functions to process sale
  saleUpdate = new updateSale(this.api)

  getSchoolList()
  {
    this.api.getList("School").subscribe(res=>{
      this.SchoolList = res['data']
      if(this.model['SchoolId'] =='')
      {
        this.model['SchoolId'] = this.SchoolList[0]['Id']
      }
      this.schoolChange(this.model['SchoolId'])
    })
  }

  getBookList()
  {
    this.api.getList("Book").subscribe(res=>{
      this.BookList = res['data']
      if(this.model['ListId'] == '')
      {
        this.model['ListId'] = this.BookList[0]['Id']
      }
    })
  }

  //Get the value of dropdown
  dropdownValue(value,model)
  {
    this.model[model] = value
  }

  schoolChange(SchoolId)
  {
    this.executeSale.getDiscountForSpecifiedSchool(SchoolId).subscribe((school)=>{
      console.log("School",school)
      this.model['discount'] = school['data'][0]['discount']
      this.ApplyDiscount()
    })
  }

  // Get books of the selected Book list
  getBooks()
  {
    let qry = "Select BookIds from t_list_master where ListId = "+this.model['ListId']
    this.api.Post('/users/executeSelectStatement',{Query : qry}).subscribe(data=>{
      console.log("BooksId : ",data)
      this.listBrowser.getBookNameFromItemTable(String(data['data'][0]['BookIds']).split(',')).subscribe(data=>{
        console.log(data)
        this.generateBookRows(data['data'])
      })
    })
    
  }

  //Generate Rows for Ngx-datatable, also adding Item Quantity in every row
  generateBookRows(books:[] = [])
  {
    this.dataRows = []
    books.forEach(book=>{
      this.dataRows.push(Object.assign({'Quantity':1,'NetPrice' : ''},book))
    })
    console.log("thisisdatarows",this.dataRows)
    this.updateNetPrice(-1)
    this.dataRows = [...this.dataRows]
    
  }

  // Update Quantity of specified Book
  updateValue(index,col,value)
  {

    
    this.dataRows[index][col] = value
    this.updateNetPrice(index)
  }


  // Update net price of the book i.e. Book rate * Book Quantity
  updateNetPrice(index = -1)
  {
    //for the specificied index
    if(index != -1)
    {
    let rate = Number(this.dataRows[index]['rate'])
    let tax_rate = Number(this.dataRows[index]['tex_rate'])
    let qty = Number(this.dataRows[index]['Quantity'])
    let NetPrice = ((rate+(rate*(tax_rate)/100)) * qty).toFixed(2)
    this.dataRows[index]['NetPrice'] = NetPrice
    }

    //for all the rows in the datatable (when books load first time in the datatable )
    //i.e. for intialize the net price
    else
    {
      this.dataRows.forEach((row,index)=>{
        let rate = Number(this.dataRows[index]['rate'])
        let tax_rate = Number(this.dataRows[index]['tex_rate'])
        let qty = Number(this.dataRows[index]['Quantity'])
        let NetPrice = (rate+(rate*(tax_rate)/100)) * qty
        this.dataRows[index]['NetPrice'] = NetPrice
      })
    }
    this.getTotalAmount()
    this.dataRows = [...this.dataRows]
  }

  //Get the total amount of the books present in the list(datatable)
  getTotalAmount()
  {
    let totalamount = 0
    this.dataRows.forEach(row=>{
      totalamount += Number(row['NetPrice'])
    })
    this.model['TotalAmount'] = String(Number(totalamount).toFixed(2))
    this.model['NetAmount'] = String(Number(totalamount).toFixed(2))
    this.ApplyDiscount()
  }

  //apply discount to the total amount to get the Net Amount to be paid by the customer
  ApplyDiscount()
  {
  
    let TotalAmount = Number(this.model['TotalAmount'])
    let discount = Number(this.model['discount'])

    //Check if discount is not exceed the limit of 0 to 100
    if(discount < 0 || discount > 100)
    {
      setTimeout(()=>{
        alert("Discount is invalid")
        this.model['discount'] = null
        this.model['NetAmount'] = String(this.model['TotalAmount'])
      },1000)
     
      
    }
    else
    {
      let netprice = (TotalAmount - (TotalAmount * (discount/100))).toFixed(2)
      this.model['NetAmount'] = String(netprice)
    }
  }

  submit()
  {
    debugger;
    if(this.SaleType=="New")
    {
      this.processSale()
    }
    else if(this.SaleType == "Edit")
    {
      this.updateSale()
    }
  }

  // Sale Process function
  processSale()
  {
    if(this.dataRows.length != 0)
    {
      if(this.isValid())
        {
      
          let selectedBookIdsWithQty = this.executeSale.getSelectedBooksId(this.dataRows)
          //this.model['BookIds'] = String(selectedBookIdsWithQty)
          this.executeSale.insertintoSaleMaster(this.model).subscribe(saleId=>{
            this.model['SaleId'] = String(saleId)
            this.executeSale.insertIntoSaleDetail(this.dataRows,saleId).subscribe((data)=>{
              
              alert('Sale Successful')
              this.router.navigateByUrl('/salebrowser')
              
            })
            this.executeSale.updateItemMaster()
          })
        }
    }
    else
    {
      alert("Book list Can't be empty")
    }
    
  }

  //delete row from the ngx-datatable
  deleteRow(index)
  {
    this.dataRows.splice(index,1)
    this.updateNetPrice()
    this.dataRows = [...this.dataRows]
  }


  // Get sale detail of specific SaleId
  getSale(SaleId,DocNo)
  {
    this.saleUpdate.getSale(SaleId,DocNo).subscribe(data=>{
      console.log("sale data : ",data)
      console.log(data)
      this.model = data[0]['data'][0]
      this.dataRows = data[1]['data']
      this.saleUpdate.oldDataRows = JSON.parse(JSON.stringify(data[1]['data']))
    })  
  }

  consoleOlddataRows()
  {
    console.log(this.saleUpdate.oldDataRows)
    this.saleUpdate.getUpdatedItemQuantity(this.dataRows).subscribe(res=>{
      console.log("item updated")
    })
  }


  // update sale 
  updateSale()
  {
    //console.log("Calling update master")
    
    //Update sale in t_sale_master
    this.saleUpdate.updateSaleMaster(this.model).subscribe(res=>{
      console.log("Sale Master updated")
    },err=>{
      alert("Error while updating sale")
    })

    //update sale detail in t_sale_detail
    this.saleUpdate.updateSaleDetail(Number(this.model['SaleId'])).subscribe(res=>{
      this.executeSale.insertIntoSaleDetail(this.dataRows,this.model['SaleId']).subscribe(data=>{
        alert("Sale updated")
      })
      console.log("Sale Detail update")
    },err=>{
      alert("Error while updating sale items")
    })

    //updating item quantity in item
    this.saleUpdate.getUpdatedItemQuantity(this.dataRows).subscribe(res=>{
      console.log("Item quantity updated in item table")
    },err=>{
      alert("Error while updating item quantity")
    })
  }



  // check basic validations
  isValid()
  {
    let valid = true
    let message = ""
    if(this.model['CustomerName'] == "")
    {
      message+="Customer Name can't be blank\n"
      valid = false
    }
    this.dataRows.forEach((row,index)=>{
      if(row['Quantity'] == null || String(row['Quantity']).trim() == "" || isNaN(row['Quantity']))
      {
        valid = false
        message += "At row "+(index+1)+" Quantity is invalid \n"
      }
    })
    

    if(!valid)
    {
      alert(message)
    }
   
    return valid
    
  }

  printInvoice() // function to generate invoice data
  {
      localStorage.setItem("invoice",JSON.stringify({"form":this.model,"table":this.dataRows})) // storing data to print on invoice
      this.router.navigateByUrl('/print/invoice') // taking to the invoice print page
  }
}
