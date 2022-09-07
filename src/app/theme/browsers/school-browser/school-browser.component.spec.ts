import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBrowserComponent } from './school-browser.component';

describe('SchoolBrowserComponent', () => {
  let component: SchoolBrowserComponent;
  let fixture: ComponentFixture<SchoolBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
