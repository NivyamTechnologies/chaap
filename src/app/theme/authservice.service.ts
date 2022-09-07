import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private route : Router) { }

  login()
  {
    if(window.atob(sessionStorage.getItem('xsW123'))=="sdrawerufthsdfodfrweizxzfded")
    {
      return true
    }
    else
    {
      this.route.navigateByUrl('/login')
      return false
    }
  }
}
