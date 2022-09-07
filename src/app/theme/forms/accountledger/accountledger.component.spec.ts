import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountledgerComponent } from './accountledger.component';

describe('AccountledgerComponent', () => {
  let component: AccountledgerComponent;
  let fixture: ComponentFixture<AccountledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
