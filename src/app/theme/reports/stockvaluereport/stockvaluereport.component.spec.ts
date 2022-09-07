import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockvaluereportComponent } from './stockvaluereport.component';

describe('StockvaluereportComponent', () => {
  let component: StockvaluereportComponent;
  let fixture: ComponentFixture<StockvaluereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockvaluereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockvaluereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
