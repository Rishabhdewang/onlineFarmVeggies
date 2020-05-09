import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'online-farm-veggies-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public error;
  isSubmitted: boolean;
  constructor(
    private loader: NgxUiLoaderService, 
    private router: Router, 
    private authService: AuthService
    ) { }
  ngOnInit(): void {
  }
  check_email() {
    this.error = "";
  }
  forgotForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  });

  onSubmit(){
    console.log(this.forgotForm.value);
    if(this.forgotForm.valid){
      let forgotData = this.forgotForm.value;
      this.loader.start();
      this.authService.forgotPassword(forgotData).subscribe(
        (success: any) => {
          localStorage.setItem("email",forgotData.email);
          this.router.navigateByUrl(`/auth/verifyotp`);
          Swal.fire("Email sent","You will get OTP on your email.Please check it.","success");
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
      this.forgotForm.reset();
      this.isSubmitted = false;
    }
    else{
      Swal.fire("Enter email address","","warning");
    }
  }
}
