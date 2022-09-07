import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
 
@Component({
  selector: 'app-newprint',
  templateUrl: './newprint.component.html',
  styleUrls: ['./newprint.component.scss']
})
export class NewprintComponent implements OnInit, OnDestroy {
  mydata: any;
  count: any;
  constructor(private api : ApicallService) { }

  ngOnInit() {

    this.getCompanyDetail() // get details of Company like company name, gstno etc from db

    if(localStorage.getItem("invoice") != undefined) // check if invoice data exist in local storage
    {
      debugger
      this.model = JSON.parse(localStorage.getItem("invoice"))['form']     // getting form data from the invoice data
      this.dataRows = JSON.parse(localStorage.getItem("invoice"))['table'] // getting item data from the invoice data
      this.getschooldetail(this.model['SaleId'])
      this.gettaxdata(this.model['SaleId']);
     let amount = Math.round(this.model['NetAmount'])
      this.words = this.api.numberToWords(amount )
this.roundoff = amount-this.model['NetAmount'] ;

    }

    // this.mydata = [{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'},{sn: 1, desc: 'CHOTI MUST oil 70 kg', msn: '2306', qty: '285.00', unit: 'BAG', listprice: '1,813.00', discount: '0%', cgstrate: '2.50%', cgstamnt: '12,919.76', sgstrate: '2.50%', sgstamnt: '12,919.76', amnt: '5,42,630.02'}];

    console.log(this.dataRows);
    if(this.dataRows.length <= 26) this.count = 'first';
    else this.count = 'second';
    console.log(this.count);
    
   }

   ngOnDestroy()
   {
     localStorage.removeItem("invoice") // clear localstorage when leaving invoice page
   }
roundoff:any;
words:any;
   model = {}
  company = {}
  school={}
  taxdata:any;
  dataRows = []
  columns = [
    
    {name : "Name", prop : "ItemName"},
    {name : "Quantity",prop : "Quantity"},
    {name : "HsnCode",prop : "HsnCode"},
    {name : "Rate", prop : "rate"},
    {name : 'Tax(%)', prop : "tex_rate"},
    {name : 'Amount', prop : "NetPrice"}
]
cname: any;
  getCompanyDetail()
  {
    let qry = "Select * from t_company_master"
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.company = data['data'][0];
      this.cname = this.company['CompanyName']
    })
  }

  getschooldetail(id){
    debugger
    let qry = `SELECT Address,gstno,panno,GRRNo,VichleNo,EwayBillNo,AadharNo,Contact,
    ifnull(shippaadharno,AadharNo) shippaadharno,Transport,ifnull(shippaddress,Address) shippaddress,ifnull(shippgstno,gstno) shippgstno ,ifnull(shipppanno, panno) shipppanno,ifnull(shippname, SchoolName) shippname  FROM t_sale_master
        left JOIN
        t_school_master
        on t_school_master.SchoolId =t_sale_master.SchoolId
    where SaleId=${id} and DocNo=${this.model['DocNo']}`
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.school = data['data'][0]
    })

  }

  gettaxdata(id){
    debugger
    this.taxdata = []

    let qry = `SELECT tex_rate,Round(sum(taxamount),2) taxamount,ifnull(sum(discrate),0) discount 
    FROM t_sale_detail 
    WHERE SaleId=${id} GROUP BY tex_rate`
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe((data)=>{
      console.log(data)
      this.taxdata = data['data']
    })

  }

  printInvoice()  // function to generate print page
  {
    const printContent = document.getElementById("invoice-POS").innerHTML;
    let popupWinindow
    popupWinindow = window.open('', '_blank', 'width=3508px,height=2480px,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    let abc = ["0", "1", "2", "3", "4", "5", "6"]
    popupWinindow.document.open();
    popupWinindow.document.write(
      `<html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
      <style>
      @page { 
        size: 72mm 210mm;
        margin: 0mm 0mm 0mm 0mm !important;
       }  

    
       @media print {

  #infoadd { margin-left: 12%;} #infomob { margin-left: 11%;} 


        #mid {margin-left: 1%; } 
       
        #table{ margin: 1%; } 
        #ptag{ margin-bottom: 5px;}
        #top, #mid,#bot{ /* Targets all id with 'col-' */
        border-bottom: 1px solid #EEE;}
        #tabletitle{
          //padding: 5px;
          font-size: 1.0em;
          background: #EEE;
        }
        #service{border-bottom: 1px solid #EEE;}
#item{width: 24mm;}
#itemtext{font-size: 1.0em;}
h1{
  font-size: 1.5em;
  color: black;
}
h2{font-size: .9em;}
h3{
  font-size: 1.2em;
  font-weight: 300;
  line-height: 2em;
}
p{
  font-size: 1.0em;
  color: black;
  line-height: 1.2em;
}
#legalcopy{
  margin-top: 5mm;
  margin-left:7%
}

#invoice-POS{
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding:2mm;
  margin: 0 auto;
  background: #FFF;
}
#info{
  display: block;
  //float:left;
  margin-left: 0;
}
table{
  width: 30%;
  border-collapse: collapse;
}
#logo{
  //float: left;

	height: 90px;
	width: 320px;
	background: url(http://nivyam.com/ssss.png) no-repeat;
	background-size: 320px 90px;
}

       
      }
      </style>
      </head>
      <body style="margin: 0px;">
      <div id="printContent">
         
       </div>`
      + printContent +
      `</div>
       <script>
       window.document.body.onload = function() {
        setTimeout(function(){ window.print();window.close(); }, 1000);
      };
       
       </script>
       </body></html>`);
    
       popupWinindow.document.close();
  }

}
