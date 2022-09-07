import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchallanbrowserComponent } from './schallanbrowser.component';

describe('SchallanbrowserComponent', () => {
  let component: SchallanbrowserComponent;
  let fixture: ComponentFixture<SchallanbrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchallanbrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchallanbrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
