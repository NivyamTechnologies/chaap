import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-browser',
  templateUrl: './school-browser.component.html',
  styleUrls: ['./school-browser.component.scss']
})
export class SchoolBrowserComponent implements OnInit {

  constructor(private api : ApicallService, private route : Router) { }

  ngOnInit() {
    this.getdata()
  }
  dataColumns = []
  dataRows = []

  getdata()
  {
    this.api.Post("/total/getBrowser",{Condition : "where 1=1"},["EntityName=School"]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  editSchool(row)
  {
    this.route.navigate(['/forms/school',{'SchoolId' : row['SchoolId']}])
  }

  deleteSale(SchoolId,rowIndex)
  {
    let qry = "Delete from t_school_master where SchoolId = "+SchoolId
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(()=>{
      alert("customer delete Successfully")
      this.dataRows.splice(rowIndex,1)
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
    let qry = "Select * from t_school_master"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.api.exportToExcel(data['data'],"School")
    })
  }
}
