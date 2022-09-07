import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';
import { ApicallService } from 'src/app/theme/apicall.service';
//import { EventEmitter } from 'events';

@Component({
  selector: 'dropdown',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  constructor(private api : ApicallService) {
    console.log("Thisispredefinedvalue : "+this.predefinedValue)
    this.ddvalue = this.predefinedValue != ""?this.predefinedValue:''
   }

  ngOnInit() {
    
    this.getdropdown()
  }
  
  dropdownOptions = []
  ddvalue = ""
  @Input() predefinedValue = ""
  @Input('name') Field = ""
  @Output() emitValue = new EventEmitter();


  dropDownValueChanged()
  {
    this.emitValue.emit(this.ddvalue)
  }
  getdropdown()
  {
    this.api.Get("/total/getdropdown",["dropdowname="+this.Field]).subscribe(res=>{
      this.dropdownOptions = res['data']
    })
  }
}
