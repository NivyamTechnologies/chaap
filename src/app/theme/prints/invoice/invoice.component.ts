import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApicallService } from '../../apicall.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit,OnDestroy {

  constructor(private api : ApicallService) { }

  ngOnInit() {

    this.getCompanyDetail() // get details of Company like company name, gstno etc from db

    if(localStorage.getItem("invoice") != undefined) // check if invoice data exist in local storage
    {
      debugger
      this.model = JSON.parse(localStorage.getItem("invoice"))['form']     // getting form data from the invoice data
      this.dataRows = JSON.parse(localStorage.getItem("invoice"))['table'] // getting item data from the invoice data
      this.getschooldetail(this.model['SaleId'])


    }
  }

  ngOnDestroy()
  {
    localStorage.removeItem("invoice") // clear localstorage when leaving invoice page
  }
  model = {}
  company = {}
  school={}
  dataRows = []
  columns = [
    
    {name : "Name", prop : "ItemName"},
    {name : "Quantity",prop : "Quantity"},
    {name : "HsnCode",prop : "HsnCode"},
    {name : "Rate", prop : "rate"},
    {name : 'Tax(%)', prop : "tex_rate"},
    {name : 'Amount', prop : "NetPrice"}
]

  getCompanyDetail()
  {
    let qry = "Select * from t_company_master"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.company = data['data'][0]
    })
  }

  getschooldetail(id){
    debugger
    let qry = `SELECT Address FROM t_sale_master
    left JOIN
    t_school_master
    on t_school_master.SchoolId =t_sale_master.SchoolId
    where SaleId=${id}`
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.school = data['data'][0]
    })

  }

  printInvoice()  // function to generate print page
  {
    const printContent = document.getElementById("invoice").innerHTML;
    const WindowPrt = window.open('', '_blank', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.open()
    WindowPrt.document.write(
    `<html>
      <head>
          <style>
          .heading
          {
              text-align: center;
              font-size: 50px;
              font-weight: 800;
              font-family: cursive;
          }
          .address
          {
              text-align: center;
              font-size: 20px;
              font-weight: 500;
              border-top: 2px solid;
              border-bottom: 2px solid;
          
          }
          .formdata
          {
              padding-left: 16px;
              font-size: 20px;
              font-weight: 500;
          }
          
          .sangleName
          {
              text-align: right;
              font-size: 15px;
              font-weight: bolder;
          }
          .bill
          {
            font-size: 17px;
            font-weight: 800;
            
          }
          .preheading
          {
            font-weight: bolder;
            padding: 2%;

          }
          .moveBottom {
            
            margin-bottom: 150mm;
          }
          </style>
          <link rel="stylesheet" type="text/css" href="./print.css">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      </head>
      <body onload="window.print();window.close()">
      `+printContent+`
      </body>
    </html>
    `
    )
    WindowPrt.document.close()
  }
}
