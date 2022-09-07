import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmComplaintComponent } from './crm-complaint.component';

describe('CrmComplaintComponent', () => {
  let component: CrmComplaintComponent;
  let fixture: ComponentFixture<CrmComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
