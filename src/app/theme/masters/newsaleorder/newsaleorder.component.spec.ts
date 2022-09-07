import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsaleorderComponent } from './newsaleorder.component';

describe('NewsaleorderComponent', () => {
  let component: NewsaleorderComponent;
  let fixture: ComponentFixture<NewsaleorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsaleorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsaleorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
