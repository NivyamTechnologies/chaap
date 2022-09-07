import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalechallanComponent } from './salechallan.component';

describe('SalechallanComponent', () => {
  let component: SalechallanComponent;
  let fixture: ComponentFixture<SalechallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalechallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalechallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
