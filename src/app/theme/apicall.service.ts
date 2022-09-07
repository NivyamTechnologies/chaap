import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DatePipe} from '@angular/common'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  serIP='myassuredness.in:3000'

  
  //serIP = 'localhost:3000'
 //ProfileId = 'mansi'
 ProfileId = 'abhishek'
  constructor(private http: HttpClient,private datepipe:DatePipe) { }


 
  modiy(data,id){
    let body
    let url = 'http://'+this.serIP+'/users/saveItem?ProfileId='+this.ProfileId+'&EntityId=&EntityName=item&Type=1'
    //let url = 192.168.0.233:3002/master/saveGridMaster?ProfileId=100000&EntityId=220000&EntityName=avc&Type=abx
    body = {DataToUpdate: data}
    return this.http.post(url,body)
  }

  localsqlser(para,body){
    debugger
   
    let url = 'http://'+this.serIP+'/users/executeSelectStatement?'+para
    return this.http.post(url,body)
  }
  saveparty(data,id){
    let body
    let url = 'http://'+this.serIP+'/users/saveParty?ProfileId='+this.ProfileId+'&EntityId=&EntityName=party&Type=1'
    //let url = 192.168.0.233:3002/master/saveGridMaster?ProfileId=100000&EntityId=220000&EntityName=avc&Type=abx
    body = {DataToUpdate: data}
    return this.http.post(url,body)
  }  
  savepurchase(data,id){
    let body
    let url = 'http://'+this.serIP+'/users/savepurchase?ProfileId='+this.ProfileId+'&EntityId=&EntityName=t_doc_detail&Type=1&Partyid='+data[1]+'&total='+data[0]+'&date='+data[2]+'&BillNo='+data[3]+'&taxamount='+data[4]
    //let url = 192.168.0.233:3002/master/saveGridMaster?ProfileId=100000&EntityId=220000&EntityName=avc&Type=abx
    body = {DataToUpdate: id}
    return this.http.post(url,body)
  } 
  
  
  fetch(data){
    let body
    let url = 'http://'+this.serIP+'/users/getitem?db_id='+this.ProfileId+'&EntityId=&EntityName=item&id='+data
    //let url = 192.168.0.233:3002/master/saveGridMaster?ProfileId=100000&EntityId=220000&EntityName=avc&Type=abx
    body = {DataToUpdate: data}
    return this.http.get(url,body)
  }

  saveMasterDefinition(EntityName,data)
  {
   
    return  this.Post("/master/saveMasterDefinition",{DataToUpdate : data},["EntityName="+EntityName])
  }

  saveGridMaster(EntityId,EntityName,data)
  {
    return this.Post("/master/saveGridMaster",{DataToUpdate : data,EntityId : EntityId,EntityName : EntityName})
  }

  Get(url,params = [])
  {
    
  
    let final_url = this.getParams(url,params)
    console.log(final_url)
    return this.http.get(final_url)
  }

  Post(url,body={},params=[])
  {
    let final_url = this.getParams(url,params)
    console.log(final_url)
    return this.http.post(final_url,body)
  }
  
  getParams(url,params=[])
  {
    let final_url = 'http://'+this.serIP+url+"?ProfileId="+this.ProfileId+"&"
    params.forEach(elem=>{
      final_url+=elem+"&"  
    })

    final_url = final_url.substring(0,final_url.length-1)
    
    return final_url
  }

  getList(Field="")
  {
    return this.Get("/total/getdropdown",["dropdowname="+Field])
  }

  login(email="",password="")
  {
    let url = 'http://'+this.serIP+"/users/login?ProfileId="+this.ProfileId
    //return this.http.post(url,{credientials : window.btoa(email+":"+password)})
    return this.http.post(url,null,{'headers' : {'Authorization' : window.btoa(email+":"+password)}})
  }
  exportToExcel(data: any[], FileName: string)
  {
    console.log(data)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    console.log(worksheet)
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    console.log(workbook)
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    console.log(excelBuffer)
    this.saveAsExcelFile(excelBuffer, FileName);
  }

  saveAsExcelFile(buffer: any, fileName: string)
  {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx'
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    // alert("Exporting to Excel")
  }
  
   numberToWords(num) {
    const first = [
      "",
      "One ",
      "Two ",
      "Three ",
      "Four ",
      "Five ",
      "Six ",
      "Seven ",
      "Eight ",
      "Nine ",
      "Ten ",
      "Eleven ",
      "Twelve ",
      "Thirteen ",
      "Fourteen ",
      "Fifteen ",
      "Sixteen ",
      "Seventeen ",
      "Eighteen ",
      "Nineteen ",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const mad = ["", "Thousand", "Million", "Billion", "Trillion"];
    let word = "";

    for (let i = 0; i < mad.length; i++) {
      let tempNumber = num % (100 * Math.pow(1000, i));
      if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
        if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
          word =
            first[Math.floor(tempNumber / Math.pow(1000, i))] +
            mad[i] +
            " " +
            word;
        } else {
          word =
            tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] +
            "-" +
            first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] +
            mad[i] +
            " " +
            word;
        }
      }

      tempNumber = num % Math.pow(1000, i + 1);
      if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
        word =
          first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] +
          "Hunderd " +
          word;
    }
    return word;
  }
}
