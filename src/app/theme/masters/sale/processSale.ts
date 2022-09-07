import { ApicallService } from '../../apicall.service';
import { getBookNames } from '../../browsers/list-browser/list-browser.component';
import { Current } from '../../Common';

export class ProcessSale
{
    constructor(private api : ApicallService){    }

    dataRows = []
    getBooksItem = new getBookNames(this.api)
    current = new Current();

    //insert data into sales table
    insertintoSaleMaster(DataToUpdate)
    {
        if(DataToUpdate['SaleId'] != "")
        {
            DataToUpdate['SaleId'] = null
        }
       
        return   this.api.saveMasterDefinition("Sale",{'t_sale_master' : [DataToUpdate]})
    }


    //insert data into Sale detail table
    insertIntoSaleDetail(DataToUpdate=[],SaleId)
    {
        this.dataRows = DataToUpdate
        DataToUpdate.forEach((row,index)=>{
            DataToUpdate[index]["SaleId"] = SaleId
            if(row['DocId'] != "")
            {
                row['DocId']=null
            }
        })
        debugger;
        return  this.api.saveGridMaster("20000","SaleDetail",{'t_sale_detail' :DataToUpdate})
    }
    //update Item quantity in item master
    updateItemMaster()
    {
        // let datatoupdate = []
        // this.dataRows.forEach((row,index)=>{
        //    let updatedQty =  Number(row['Qty']) - Number(row['Quantity'])
        //    datatoupdate.push({ItemId : row['ItemId'], Qty : updatedQty})
        // })
        
        // debugger;
        // let updateQry = this.current.generateUpdateQuery(datatoupdate,["ItemId"],["ItemId"],"","item")
        // console.log(updateQry)
        // this.api.Get("/total/execMultipleQuery",["Query="+updateQry])
        // .subscribe((res)=>{
        //     console.log("item updated",res)
        // },err=>{
        //     console.log("error while updating item",err)
        // })
        // this.getBooksItem.getBookNameFromItemTable(this.getSelectedBooksId(this.dataRows)).subscribe((data)=>{
        //     this.updateItemQty(data['data'])
        // })
    }

    //update the Quantity of items in item table
    updateItemQty(Items = [])
    {
        // let finalItemQuantityWithItemId = []
        // this.dataRows.forEach((row)=>{
        //     Items.forEach(item=>{
        //         if(item['ItemId'] == row['Item'])
        //         {
        //             let qty = Number(item['Qty']) - Number(row['Qty'])
        //             finalItemQuantityWithItemId.push({'ItemId':item['ItemId'],'Qty' : qty})
        //         }
        //     })
        // })

        // console.log("finalItemArray",finalItemQuantityWithItemId)
        // let updateQry = this.current.generateUpdateQuery(finalItemQuantityWithItemId,["ItemId"],["ItemId"],"","item")
        // console.log("final_updateQry",updateQry)

    }
    //Get Selected Books Id
    getSelectedBooksId(books=[])
    {
        let selectBookIds = []
        books.forEach(book=>{
            if(selectBookIds.indexOf(book['ItemId']+":"+book['Quantity']) == -1)
            {
                selectBookIds.push(book['ItemId']+":"+book['Quantity'])
            }
        })

        return selectBookIds
    }

    getDiscountForSpecifiedSchool(SchoolId = "-1")
    {
           let qry = "Select discount from t_school_master where SchoolId = "+SchoolId
            
            return this.api.Post('/users/executeSelectStatement',{Query : qry})
        
    }
}