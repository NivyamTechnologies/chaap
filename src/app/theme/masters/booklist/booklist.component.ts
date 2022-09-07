import { Component, OnInit } from '@angular/core';
import queryJson from '../../query.json'
import { ApicallService } from '../../apicall.service';
import {Current} from '../../Common'
import { ActivatedRoute } from '@angular/router';
import { getBookNames } from '../../browsers/list-browser/list-browser.component';
@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss']
})
export class BooklistComponent implements OnInit {

  constructor( private api : ApicallService, private activatedRoute : ActivatedRoute) {

      this.activatedRoute.params.subscribe(routeparam=>{
        console.log(routeparam)
        if(routeparam['ListId'] != '' && routeparam['ListId'] != undefined){
          this.EditListId = routeparam['ListId']
          this.Type="Modify"
          this.title="Edit list"
          this.getEditListFormReady()
        }
      })
     }

  ngOnInit() { 
    this.getSchoolList()
    this.getPrequisite()
  }


  model = {'ListId':'',
           'ListName' : '',
           'SchoolId' : '',
          }
  columns = []
  selected = []
  SelectedBooks = []
  Prakashans = []
  SetCodes = []
  Items = []
  SchoolList = []
  PartyId = -1
  validationCheck = {'ListName' : ''}
  Type="NewList"
  title = "Add List"
  EditListId = -1
  current = new Current();
  
  getSchoolList()
  {
    this.api.getList("School").subscribe(res=>{
      this.SchoolList = res['data']
    
      if(this.model['SchoolId'] == '')
      {
        this.model['SchoolId'] = this.SchoolList[0]['Id']
      }
    })
  }
  
  // Get Party/Publisher/Prakashan from Party table
  getPrequisite()
  {
      let queryData =['getPrakashan']
      this.api.Get("/total/getAppdata",["DropdownData="+JSON.stringify(queryData)]).subscribe(data=>{

        // Set Party/Publisher/Prakashan to the Prakshan array
        this.Prakashans = data[0]['data']
        this.PartyId = this.Prakashans[0]['PartyId']
       
        this.getItems()
        console.log(data)
      })
  }

  // Get SetCode from item table
  getSetCode()
  {
    let qry = "Select distinct setcode from item where PartyId = "+this.model['PartyId']
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)

      // assigning SetCode to the SetCode array
      this.SetCodes = data['data']
      this.model['SetCode'] = this.SetCodes[0]['setcode']
      this.getItems()
    })
  }

  // Get Books according to the Selecting Party/Publisher
  getItems()
  {
    let sql = "Select ItemId,ItemName,ItemMrp,setcode from item where PartyId = "+this.PartyId//+ " and setcode = '"+this.model['SetCode']+"'"
    this.api.Post("/users/executeSelectStatement",{Query : sql}).subscribe(data=>{
      this.Items = data['data']
      console.log(data)
    })
  }
 
  dropdownValue(value,model)
  {
    this.model[model] = value 
  }
  // Store Selected Books in Selected Book Array ...also the index of Selected Book in selected array
    onSelect(Book) 
    {
      let bookAlreadySelected = false
      let SelectedBookIndex = -1
        this.SelectedBooks.forEach((book,index)=>{
          if(book['ItemId'] == Book['ItemId'])
          {
            bookAlreadySelected = true
            SelectedBookIndex = index
          }
        })

        if(!bookAlreadySelected)
        {
          this.SelectedBooks.push(Book)
          this.selected.push(Book['ItemId'])
        }
        else
        {
          this.SelectedBooks.splice(SelectedBookIndex,1)
          this.selected.splice(SelectedBookIndex,1)
        }

        this.SelectedBooks = [...this.SelectedBooks]
        this.selected = [...this.selected]
    }

    //Submit button click event
    formSubmitted()
    {
      this.model['BookIds'] = this.selected
      if(this.isValid())
      {
        if(this.Type == "NewList")
        {
          this.model['CreatedDate'] =  new Date().toISOString().split('T')[0]
          this.api.saveMasterDefinition("List",{"t_list_master" : [this.model]}).subscribe(data=>{
            this.model['ListId'] = String(data)
            alert("List Added Successfully")
          })
          console.log(this.model)
        }
        else
        {
          this.updateBookListRecord()
        }
      }
     
    }

    //Check validation of the form
    isValid()
    {
      let valid = true
      let current = new Current();
      let ErrorMessage =  current.isValid(this.validationCheck,this.model)
      if(ErrorMessage != "")
      {
        valid = false
        alert(ErrorMessage)
      }

      return valid
    }


    // Get data from the list master of the given list Id
    getEditListFormReady()
    {
      let qry = "Select * from t_list_master where ListId = "+this.EditListId
      this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(book=>{
        console.log(book)
        this.fillEditListForm(book['data'][0])
      })
    }


    //Fill the existing detail of the book list in the form
    fillEditListForm(book)
    {
      

      //Converting String Book Id array into Number Book Id array
      let selected = String(book['BookIds']).split(',')
      selected.forEach(Id=>{
        this.selected.push(Number(Id))
      })
      this.selected = [...this.selected]
      this.model = book
      console.log(this.model)
      this.getBookNameFromIds(this.selected)
    }


    /*  Get BookName,BookId,SetCode of the books in the selected list
        from the same function used in the list-browser component   */
    getBookNameFromIds(BookId = [])
    {
      console.log(this.model)
      let listbrowserObj = new getBookNames(this.api)
      listbrowserObj.getBookNameFromItemTable(BookId).subscribe(data=>{
        console.log("booknames : ",data)
        this.SelectedBooks = data['data']
        this.SelectedBooks = [...this.SelectedBooks]
      })
    }

    updateBookListRecord()
    {
      this.model['ModifiedDate'] = new Date().toISOString().split('T')[0]
      let updateQry = this.current.generateUpdateQuery([this.model],["ListId","CreatedDate"],["ListId"],"","t_list_master")
      console.log("Update query : ",updateQry)
      this.api.Post('/users/executeSelectStatement',{Query : updateQry}).subscribe((data)=>{
        alert('List Updated')
      })
    }
}
