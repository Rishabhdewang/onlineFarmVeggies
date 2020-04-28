import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from "../../shared/auth/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'online-farm-veggies-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isSubmitted = false;

  constructor(
    private router: Router,
    private loader : NgxUiLoaderService,
    private authService : AuthService
  ) { }

  changePasswordForm = new FormGroup({
    oldPassword : new FormControl("",[Validators.required]),
    newPassword : new FormControl("",[Validators.required])
  })

  ngOnInit(): void {
  }

  checkOldPassword(event){
    if(event.target.value){
      this.changePasswordForm.value.oldPassword = event.target.value;
      let changeFromData = this.changePasswordForm.value;
      this.loader.start();
      this.authService.checkOldPassword(changeFromData).subscribe(
        (success: any) => {
          this.router.navigateByUrl(`/admin/dashboard/change-password`);
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      )
    }
  }

  onSubmit(){
    console.log(this.changePasswordForm.value);
    if(this.changePasswordForm.valid){
      let changeFromData = this.changePasswordForm.value;
      this.loader.start();
      this.authService.changePassword(changeFromData).subscribe(
        (success: any) => {

          this.router.navigateByUrl(`/admin/auth/login`);
          Swal.fire("Password Changed","Password Changed Successfully","success");
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
      this.changePasswordForm.reset();
      this.isSubmitted = false;
    }
  }
}
