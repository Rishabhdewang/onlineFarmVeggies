import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from "../../shared/auth/auth.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/services/data.service';


@Component({
  selector: 'online-farm-veggies-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted: boolean = false;
  public error;

  constructor(
    private router: Router,
    private loader : NgxUiLoaderService,
    private authService : AuthService,
    // private dataService : DataService
  ) { }
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required,Validators.email]),
    password: new FormControl("", [Validators.required])
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
          // console.log("this is success: " + JSON.stringify(success));

          localStorage.setItem("token", success.headers.get("Authorization"));
          // console.log(localStorage.getItem('token'));

          this.router.navigateByUrl(`/`);
          Swal.fire("Logged In","","success");
          // alertFunctions.typeSuccess();
          this.loader.stop();
        },
        error => {
          // if(error.error.code == 406){
          //   Swal.fire(error.error.message,"","warning");
          // }
          // if(error.status === 432){
          //   Swal.fire("Email is not verfied","Please verify your email","warning");
          // }
          this.loader.stop();
        }
      );
      this.loginForm.reset();
      this.isSubmitted = false;
    }
  }


}
