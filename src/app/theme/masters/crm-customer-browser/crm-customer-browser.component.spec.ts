import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCustomerBrowserComponent } from './crm-customer-browser.component';

describe('CrmCustomerBrowserComponent', () => {
  let component: CrmCustomerBrowserComponent;
  let fixture: ComponentFixture<CrmCustomerBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCustomerBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCustomerBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
