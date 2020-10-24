import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBoxPasswordComponent } from './alert-box-password.component';

describe('AlertBoxPasswordComponent', () => {
  let component: AlertBoxPasswordComponent;
  let fixture: ComponentFixture<AlertBoxPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertBoxPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBoxPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
