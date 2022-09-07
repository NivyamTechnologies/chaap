import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockreportComponent } from './stockreport.component';

describe('StockreportComponent', () => {
  let component: StockreportComponent;
  let fixture: ComponentFixture<StockreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
