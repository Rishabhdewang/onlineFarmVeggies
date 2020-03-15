import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  isSubmitted: boolean;

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

  onSubmit(){
    console.log(this.otpForm.value);
    if(this.otpForm.valid){
      let otpData = this.otpForm.value;
      this.loader.start();
      this.authService.verifyotp(otpData).subscribe(
        (success: any) => {
          // console.log("this is success: " + JSON.stringify(success));

          localStorage.setItem("token", success.headers.get("Authorization"));
          console.log(localStorage.getItem('token'));

          this.router.navigateByUrl(`/farmer/auth/resetPassword`);
          Swal.fire("Verified","OTP is Verified","success");
          // alertFunctions.typeSuccess();
          this.loader.stop();
        },
        error => {
          console.log(error);

          Swal.fire("Opps... Wrong OTP","Please provide correct OTP","error");
          this.loader.stop();
        }
      );
      this.otpForm.reset();
      this.isSubmitted = false;
    }
  }
}
