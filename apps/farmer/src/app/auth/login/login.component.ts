import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
// import * as alertFunctions from '../../shared/data/sweet-alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean;
  public error;

  constructor(
    private router: Router,
    private loader : NgxUiLoaderService,
    private authService : AuthService
  ) { }
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required,Validators.email]),
    password: new FormControl("", [Validators.required]),
    remember : new FormControl("")
  });

  ngOnInit(): void {
  }

  check_login() {
    this.error = "";
  }

  onSubmit(){
    if(this.loginForm.valid){
      let loginData = this.loginForm.value;
      this.loader.start();
      this.authService.login(loginData).subscribe(
        (success: any) => {
          localStorage.setItem("token", success.headers.get("Authorization"));

          this.router.navigateByUrl(`/farmer/dashboard/dashboard`);
          Swal.fire("Logged In","Welcome to Dashbord","success");
          this.loader.stop();
        },
        error => {
          console.log(error);
          if(error.error.code == 406){
            Swal.fire(error.error.message,"","warning");
          }
          if(error.status === 432){
            Swal.fire("Email is not verfied","Please verify your email","warning");
          }
          this.loader.stop();
        }
      );
      this.loginForm.reset();
      this.isSubmitted = false;
    }
  }

}
