import { Component, OnInit } from '@angular/core';
import {ApicallService} from '../../apicall.service'
import { Router,ActivatedRoute } from '@angular/router';
import { computeStyle } from '@angular/animations/browser/src/util';
import { Current } from '../../Common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private tData:ApicallService, private route : Router, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['ItemId'] != "" && param['ItemId'] != undefined)
      {
        this.title = "Edit School"
        this.type = "EditSchool"
        this.getSchool(param['ItemId'])
      }
    })
   }
  
   title="Item"
   type= "NewItem"
   current = new Current()
  PartyList = []
  myvar:any = {ItemId: null,
  ItemName:null,
  ItemMrp:null,
  HsnCode:null,
  Qty:null,
  Catagory:null,
  purchaseprice:0,
  setcode:null,
  ItemCode:null,
  PartyId:null,
  Active:'Y',
  tex_rate:0,
  center_taxCGST:0,
  state_taxSGST:0,
  total_taxIGST:0
}

  ngOnInit() {
    this.getPartyList()
  }

  getPartyList()
  {
    let queryData =['getPrakashan']
    this.tData.Get("/total/getAppdata",["DropdownData="+JSON.stringify(queryData)]).subscribe(data=>{

      // Set Party/Publisher/Prakashan to the Prakshan array
      this.PartyList = data[0]['data']
      this.myvar.PartyId = this.PartyList[0]['PartyId']
     
     
    })
  }

  getSchool(ItemId)
  {
    let qry = "Select * from  item where ItemId = "+ItemId
    this.tData.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
      this.myvar = data ['data'][0]
     
    })
  }

  ready(){
    if(this.type == "NewItem")
      {
    let rd = true
      if(rd){
        this.tData.modiy(this.myvar,this.myvar.ItemId).subscribe(res=>{
          console.log(res);
          if(res){
            alert("Saved Document");
          }

        })
      }
    }else{
      {
        let updateQry = this.current.generateUpdateQuery(
          [this.myvar],
          ["ItemId"],
          ["ItemId"],
          "",
          "item"
          )
        
          this.tData.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
            alert("Item detail updated")
            
          },(err)=>{
            console.log(err)
            alert("Error while updating Item detail")
          })
      }
    }
    }

}
