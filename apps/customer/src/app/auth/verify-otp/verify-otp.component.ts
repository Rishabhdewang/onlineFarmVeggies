import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'online-farm-veggies-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  isSubmitted: boolean;
  public error;

  constructor(
    // private router : Router,
    // private loader : NgxUiLoaderService,
    // private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  otpForm = new FormGroup({
    otp : new FormControl('',[Validators.required])
  });

  check_otp(){
    this.error = "";
  }

}
