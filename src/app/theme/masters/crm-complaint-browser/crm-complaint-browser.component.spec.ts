import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmComplaintBrowserComponent } from './crm-complaint-browser.component';

describe('CrmComplaintBrowserComponent', () => {
  let component: CrmComplaintBrowserComponent;
  let fixture: ComponentFixture<CrmComplaintBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmComplaintBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmComplaintBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
