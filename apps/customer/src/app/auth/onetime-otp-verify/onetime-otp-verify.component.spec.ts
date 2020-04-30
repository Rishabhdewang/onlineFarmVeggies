import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnetimeOtpVerifyComponent } from './onetime-otp-verify.component';

describe('OnetimeOtpVerifyComponent', () => {
  let component: OnetimeOtpVerifyComponent;
  let fixture: ComponentFixture<OnetimeOtpVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnetimeOtpVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnetimeOtpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
