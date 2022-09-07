import { ApicallService } from '../../apicall.service';
import {ProcessSale} from '../sale/processSale'
import {updateSale} from '../sale/updateSale'
export class SaleOrderProcess
{
    constructor(private api : ApicallService){}
    
    saveSale = new ProcessSale(this.api)
    updateSale = new updateSale(this.api)

    insertintoSaleMaster(SaleModel)
    {
        return  this.saveSale.insertintoSaleMaster(SaleModel)
    }

    insertintoSaleDetail(DataTable=[],SaleId)
    {
        return this.saveSale.insertIntoSaleDetail(DataTable,SaleId)
    }
    
    updateItemMaster(DataTable = [])
    {
        this.saveSale.dataRows = DataTable
        this.saveSale.updateItemMaster()
    }

    getSale(SaleId,DocNo)
    {
        return this.updateSale.getSale(SaleId,DocNo)
    }

    setOldDataRow(OldData = [])
    {
        this.updateSale.oldDataRows = OldData
    }

    getOldDataRow()
    {
        console.log(this.updateSale.oldDataRows)
    }

    updateSaleMaster(SaleMaster)
    {
        return this.updateSale.updateSaleMaster(SaleMaster)
    }

    updateSaleDetail(DataTable=[],SaleId)
    {
     return   this.updateSale.updateSaleDetail(SaleId)
    }

    updateSaleItemQuantity(DataTable=[])
    {
      return  this.updateSale.getUpdatedItemQuantity(DataTable)
    }



}