import { DatePipe } from '@angular/common'

export  class Current
{
    constructor(private datepipe ?: DatePipe){}

    isValid(checkModels = {},DataTobeCheck = {})
    {
        let errorMessage = ""
        Object.keys(checkModels).forEach(model=>{
            if(DataTobeCheck[model] ==checkModels[model] || DataTobeCheck == null)
            {
                errorMessage +=model+" is not valid\n"
            }
        })

        return errorMessage
    }

    removeDateTime(data = [],ColumnsName=[])
    {
        data.forEach((row,index)=>{
            ColumnsName.forEach(column=>{
                data[index][column] = String(row[column]).split('T')[0]
            })
        })
        console.log(data)
        return data
    }


    generateUpdateQuery(DataToUpdate = [],ColumnsNotToBeIncluded = [],DataConditions = [],ExtraCondition = "",TableName = "")
    {
        let UpdateQuery = ""
        DataToUpdate.forEach(row=>{
            UpdateQuery +=  "Update "+TableName+" set "
            Object.keys(row).forEach(col=>{
                if(ColumnsNotToBeIncluded.indexOf(col) == -1)
                {
                  UpdateQuery += col+ " = '"+row[col]+"', "  
                }
            })

            UpdateQuery = UpdateQuery.substring(0,UpdateQuery.length-2)+ "  where "
            DataConditions.forEach(col=>{
                UpdateQuery += col + "= "+row[col] +" and "
            })
            UpdateQuery  = UpdateQuery.substring(0,UpdateQuery.length-4)+" "+ExtraCondition+";"
        })

        return UpdateQuery
    }
}