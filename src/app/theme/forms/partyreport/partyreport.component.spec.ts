import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyreportComponent } from './partyreport.component';

describe('PartyreportComponent', () => {
  let component: PartyreportComponent;
  let fixture: ComponentFixture<PartyreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
