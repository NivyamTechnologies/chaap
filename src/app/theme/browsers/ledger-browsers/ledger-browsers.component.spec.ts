import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerBrowsersComponent } from './ledger-browsers.component';

describe('LedgerBrowsersComponent', () => {
  let component: LedgerBrowsersComponent;
  let fixture: ComponentFixture<LedgerBrowsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerBrowsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerBrowsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
