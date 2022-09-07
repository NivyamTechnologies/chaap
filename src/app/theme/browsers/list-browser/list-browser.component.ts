import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Current } from '../../Common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-browser',
  templateUrl: './list-browser.component.html',
  styleUrls: ['./list-browser.component.scss']
})
export class ListBrowserComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
    this.getSchoolList()
    // this.getdata();
  }

  dataRows = []
  dataColumns = [{name : "Id",prop : "ListId"},
                  {name : "Name", prop : "ListName"},                
                  {name : "BookId's", prop : "BookIds"},
                  {name : "Created Date", prop : "CreatedDate"},
                  {name : "Modified Date", prop : "ModifiedDate"},
]
 SchoolId = ""
 SchoolList = []
  current = new Current()
  getBooksName = new getBookNames(this.api)

  getSchoolList()
  {
    this.api.getList("School").subscribe(res=>{
      this.SchoolList = res['data']
      
    })
  }
  //Get list browser data from database
  getdata()
  {
    this.api.Get("/total/getAppdata",["DropdownData="+JSON.stringify(["getListBrowsers"]),"condn="+this.SchoolId]).subscribe(data=>{
      console.log(data[0]['data'])
      this.dataRows =this.current.removeDateTime(data[0]['data'],["CreatedDate","ModifiedDate"])
      this.getBookName()
    })
  }

  //Display Book Name instead of BookId
  getBookName()
  {
    let BookId = []
    this.dataRows.forEach(elem=>{
      String(elem['BookIds']).split(',').forEach(Id=>{
        if(BookId.indexOf(Id) ==-1)
        {
          BookId.push(Id)
        }
      })
    })

    this.getBookNameFromItemTable(BookId)
  }

  getBookNameFromItemTable(bookId = [])
  {
    this.getBooksName.getBookNameFromItemTable(bookId).subscribe(data=>{
     this.updateRowdata(data['data'])
    
    })
  //   let bookIdStr = JSON.stringify(bookId).replace('[',"(").replace(']',')')
  //   let qry = "Select ItemId,ItemName,SetCode from item where ItemId in "+bookIdStr

  //   this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
  //     console.log(data['data'])
  //     this.updateRowdata(data['data'])
  //   })
  }

  updateRowdata(Bookname = [])
  {
    this.dataRows.forEach((row,index)=>{
      let BookNames = ""
      String(row['BookIds']).split(',').forEach(Id=>{
        Bookname.forEach(name=>{
          if(name['ItemId'] == Id)
          {
            BookNames +=name['ItemName']+"("+name['SetCode']+"), "
          }
        })
      })
      BookNames = BookNames.substring(0,BookNames.length-2)
      this.dataRows[index]['BookIds'] = BookNames
    })

    this.dataRows = [...this.dataRows]
  }

  EditList(row)
  {
    console.log(row)
    this.route.navigate(['/list',{ListId : row['ListId']}])
  }

  deleteSale(ListId,rowIndex)
  {
    let qry = "Delete from t_list_master where ListId = "+ListId
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(()=>{
      alert("List delete Successfully")
      this.dataRows.splice(rowIndex,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select * from t_list_master"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"List")
    })
  }

}

export class getBookNames
{

  constructor(private api : ApicallService){}

  
  getBookNameFromItemTable(bookId = [])
  {
    let bookIdStr = JSON.stringify(bookId).replace('[',"(").replace(']',')')
    let qry = "Select ItemId,ItemName,Qty,ItemMrp,rate,tex_rate,SetCode from item where ItemId in "+bookIdStr

    return this.api.Post("/users/executeSelectStatement",{Query : qry})
  }

  updateRowdata(Bookname = [],dataRows = [])
  {
    dataRows.forEach((row,index)=>{
      let BookNames = ""
      String(row['BookIds']).split(',').forEach(Id=>{
        Bookname.forEach(name=>{
          if(name['ItemId'] == Id)
          {
            BookNames +=name['ItemName']+"("+name['SetCode']+"), "
          }
        })
      })
      BookNames = BookNames.substring(0,BookNames.length-2)
      dataRows[index]['BookIds'] = BookNames
    })

    return dataRows
  }

 
}
