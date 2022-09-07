import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBrowserComponent } from './list-browser.component';

describe('ListBrowserComponent', () => {
  let component: ListBrowserComponent;
  let fixture: ComponentFixture<ListBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
