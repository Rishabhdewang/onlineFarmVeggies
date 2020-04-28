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
