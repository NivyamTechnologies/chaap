import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseentryComponent } from './purchaseentry.component';

describe('PurchaseentryComponent', () => {
  let component: PurchaseentryComponent;
  let fixture: ComponentFixture<PurchaseentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
