import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public error;
  isSubmitted: boolean;

  constructor(
    private loader : NgxUiLoaderService,
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }


  check_email() {
    this.error = "";
  }

  forgotForm = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.email])
  });

  onSubmit(){
    console.log(this.forgotForm.value);
    if(this.forgotForm.valid){
      let forgotData = this.forgotForm.value;
      this.loader.start();
      this.authService.forgotPassword(forgotData).subscribe(
        (success: any) => {
          // console.log("this is success: " + JSON.stringify(success));

          // localStorage.setItem("token", success.headers.get("Authorization"));
          // console.log(localStorage.getItem('token'));

          this.router.navigateByUrl(`/farmer/auth/verifyOTP`);
          Swal.fire("Email sent","You will get OTP on your email.Please check it.","success");
          // alertFunctions.typeSuccess();
          this.loader.stop();
        },
        error => {
          console.log(error);

          Swal.fire("Opps... Email not sent","Please provide correct credential","error");
          this.loader.stop();
        }
      );
      this.forgotForm.reset();
      this.isSubmitted = false;
    }
  }
}
