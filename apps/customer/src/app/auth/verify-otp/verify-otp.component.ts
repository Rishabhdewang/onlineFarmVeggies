import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from "../../shared/auth/auth.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'online-farm-veggies-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  isSubmitted: boolean;
  public error;

  constructor(
    private router : Router,
    private loader : NgxUiLoaderService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  otpForm = new FormGroup({
    otp : new FormControl('',[Validators.required])
  });

  check_otp(){
    this.error = "";
  }


  onSubmit(){
    console.log(this.otpForm.value);
    if(this.otpForm.valid){
      let otpData = {
        otp : this.otpForm.value.otp,
        email : localStorage.getItem('email')
      }
      this.loader.start();
      this.authService.verifyotp(otpData).subscribe(
        (success: any) => {
          this.router.navigateByUrl(`/admin/auth/resetPassword`);
          Swal.fire("Verified","OTP is Verified","success");
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
      this.otpForm.reset();
      this.isSubmitted = false;
    }
    else{
      Swal.fire("Enter OTP to reset password","","warning");
    }
  }

}
