import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/theme/apicall.service';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  constructor(private route  : Router, private api : ApicallService) { }

  ngOnInit() {
    sessionStorage.clear()
  }

  email = ""
  password = ""

  login()
  {
    this.api.login(this.email,this.password).subscribe((res)=>{
      if(res['login']=="authorized")
      {
        sessionStorage.setItem("xsW123",window.btoa("sdrawerufthsdfodfrweizxzfded"))
        this.route.navigateByUrl('/dashboard/default')
      }
      else if(res['login'] == "passowrd incorrect")
      {
        alert("Incorrect Password")
      }
      else
      {
        alert("Error while login\n Contact System Administrator")
      }
    },err=>{
      if(err['status']=="401")
      {
        alert("User not found")
      }
      else
      {
        alert("Error while login\n Contact System Administrator")
      }
    })
    // this.route.navigateByUrl('/dashboard/default')
  }

}
