import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasechallanComponent } from './purchasechallan.component';

describe('PurchasechallanComponent', () => {
  let component: PurchasechallanComponent;
  let fixture: ComponentFixture<PurchasechallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasechallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasechallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
