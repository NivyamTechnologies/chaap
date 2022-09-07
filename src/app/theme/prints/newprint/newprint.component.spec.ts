import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprintComponent } from './newprint.component';

describe('NewprintComponent', () => {
  let component: NewprintComponent;
  let fixture: ComponentFixture<NewprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
