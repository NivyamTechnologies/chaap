import { ApicallService } from '../../apicall.service';
import {Current} from '../../Common'
export class updateSale
{
    constructor(private api : ApicallService){}

    current = new Current()
    oldDataRows = []
    getSale(SaleId,DocNo)
    {
        let qry = 'Select * from t_sale_master where DocNo='+DocNo+' and SaleId = '+SaleId+";select t1.*,t2.ItemName,t1.ItemCode,t2.Qty,t2.SetCode,HsnCode from t_sale_detail t1 inner join item t2 on t1.ItemId = t2.ItemId where t1.DocNo="+DocNo+" and t1.SaleId =  "+SaleId
        
        return this.api.Get("/total/execMultipleQuery",["Query="+qry])
    }


    //Update sale in t_sale_master
    updateSaleMaster(SaleMaster = {})
    {
        console.log(SaleMaster)
        SaleMaster['ModifiedDate']  = new Date().toISOString().split('T')[0]
        let updateQry = this.current.generateUpdateQuery([SaleMaster],["SaleId","CreatedDate"],["SaleId"],
        "","t_sale_master")

        console.log("Udpateqry for sale master",updateQry)

        return this.api.Post("/users/executeSelectStatement",{Query : updateQry})

    }

    //Delete Items of specifice SaleId in t_sale_detail
    updateSaleDetail(SaleId=-1)
    {
        let deleteQry = "Delete from t_sale_detail where DocNo=27 and SaleId = "+SaleId
        console.log("deelet qry for sale detail",deleteQry)
        return this.api.Post("/users/executeSelectStatement",{Query : deleteQry})
    }

    //Get the updated quantity of items
    getUpdatedItemQuantity(NewDataRows = [])
    {
        let updateRows = []
        let updatingitemsIds = []
        NewDataRows.forEach(row=>{
            this.oldDataRows.forEach(oldrow=>{
                if(row['ItemId'] == oldrow['ItemId'])
                {
                    updatingitemsIds.push(Number(row['ItemId']))
                    //if Updated Quantity is greater than the previous Quantity then minus the updated  quantity from the item table quantity
                    if(Number(row['Quantity']) > Number(oldrow['Quantity']))
                    {
                     updateRows.push({'ItemId' : oldrow['ItemId'],'Qty': "-"+String(Number(row['Quantity']) - Number(oldrow['Quantity']))})   
                    }

                    //if Updated Quantity is less than the previous Quantity then add the updated quantity in the item table quantity
                    else
                    {
                     updateRows.push({'ItemId' : oldrow['ItemId'],'Qty': "+"+String(Number(oldrow['Quantity']) - Number(row['Quantity']))})
                    }
                }
             
            })
        })
        if(this.oldDataRows.length > NewDataRows.length)
        {
            let returnItemsArrays = this.checkForReturnItems(NewDataRows,updatingitemsIds)
            returnItemsArrays.forEach(row=>{
                updateRows.push(row)
            })
        }
        else if(this.oldDataRows.length < NewDataRows.length)
        {
            let addedItemsArrays = this.checkForAddedItems(NewDataRows,updatingitemsIds)
            addedItemsArrays.forEach(row=>{
                updateRows.push(row)
            })
            
        }

        console.log(updateRows)
        updateRows = [...updateRows]
        return  this.updateItemQuantity(updateRows)
    
    }

    checkForReturnItems(NewRows=[],updatedItemIds = [])
    {
        let returnItemRows = []
        this.oldDataRows.forEach(oldrow=>{
            if(updatedItemIds.indexOf(Number(oldrow['ItemId'])) == -1)
            {
                returnItemRows.push({'ItemId' : oldrow['ItemId'],'Qty': "+"+String(oldrow['Quantity'])})
            }
        })

        return returnItemRows
    }

    checkForAddedItems(NewRow=[],updatedItemIds=[])
    {
        let addItemRows = []
        NewRow.forEach(newrow=>{
            if(updatedItemIds.indexOf(Number(newrow['ItemId'])) == -1)
            {
                addItemRows.push({'ItemId' : newrow['ItemId'], 'Qty' :  Number(newrow['Qty']) - Number(newrow['Quantity'])})
            }
        })

        return addItemRows
    }
    //Store the updated Quantity in the rows array
   updateItemQuantity(rows=[])
   {
       rows.forEach(row=>{
           this.oldDataRows.forEach(oldrow=>{
               if(row['ItemId'] == oldrow['ItemId'])
               {
                   row['Qty'] = eval(oldrow['Qty']+row['Qty'])
               }
           })
       })

       //Get the query to update the Quantity in item table
       let updateQry = this.current.generateUpdateQuery(rows,["ItemId"],["ItemId"],"","item")
       
     return  this.api.Get("/total/execMultipleQuery",["Query="+updateQry])
   }
}