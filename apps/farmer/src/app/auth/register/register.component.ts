import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from "../../shared/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSubmitted: boolean;
  public error;

  constructor(
    private router: Router,
    private loader : NgxUiLoaderService,
    private authService : AuthService
  ) { }
  registerForm = new FormGroup({
    name : new FormControl("",[Validators.required]),
    email: new FormControl("", [Validators.required,Validators.email]),
    password: new FormControl("", [Validators.required]),
    confirmPassword : new FormControl("",[Validators.required]),
    termAndCondition : new FormControl(true,[Validators.required])
  });

  ngOnInit(): void {
  }

  check_register() {
    this.error = "";
  }

  onSubmit(){
    console.log(this.registerForm.value);
    if(this.registerForm.value.password != this.registerForm.value.confirmPassword){
      Swal.fire("Password don't match","Please enter same password.","warning");
    }
    else if(this.registerForm.value.termAndCondition == false){
      Swal.fire("Please accept term & conditions","","warning");
    }
    else if(this.registerForm.valid){
      let registerData = this.registerForm.value;
      this.loader.start();
      this.authService.register(registerData).subscribe(
        (success: any) => {
          // console.log("this is success: " + JSON.stringify(success));

          localStorage.setItem("token", success.headers.get("Authorization"));
          console.log(localStorage.getItem('token'));

          this.router.navigateByUrl(`/auth/login`);
          Swal.fire("Account Registered","Please login now","success");
          // alertFunctions.typeSuccess();
          this.loader.stop();
        },
        error => {
          console.log(error);

          Swal.fire("Opps... Register Failed","Please provide correct credential","error");
          this.loader.stop();
        }
      );
      this.registerForm.reset();
      this.isSubmitted = false;
    }
    else{
      Swal.fire("Enter Complete Information","","warning");
    }
  }

}
