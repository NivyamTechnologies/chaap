import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleBrowserComponent } from './sale-browser.component';

describe('SaleBrowserComponent', () => {
  let component: SaleBrowserComponent;
  let fixture: ComponentFixture<SaleBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
