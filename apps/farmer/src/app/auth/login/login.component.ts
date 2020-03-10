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
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      let loginData = this.loginForm.value;
      this.loader.start();
      this.authService.login(loginData).subscribe(
        (success: any) => {
          // console.log("this is success: " + JSON.stringify(success));

          localStorage.setItem("token", success.headers.get("Authorization"));
          console.log(localStorage.getItem('token'));

          this.router.navigateByUrl(`/dashboard/dashboard`);
          Swal.fire("Logged In","Welcome to Dashbord","success");
          // alertFunctions.typeSuccess();
          this.loader.stop();
        },
        error => {
          console.log(error);

          Swal.fire("Opps... Login Failed","Please provide correct credential","error");
          this.loader.stop();
        }
      );
      this.loginForm.reset();
      this.isSubmitted = false;
    }
  }

}
