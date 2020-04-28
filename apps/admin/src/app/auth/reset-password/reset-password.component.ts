import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../shared/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isSubmitted: boolean;

  constructor(
    private router : Router,
    private loader : NgxUiLoaderService,
    private authService :AuthService
  ) { }

  ngOnInit(): void {
  }

  resetForm = new FormGroup({
    newPassword : new FormControl('',[Validators.required]),
    confirmPassword : new FormControl('',[Validators.required])
  })

  onSubmit(){
    console.log(this.resetForm.value);
    if(this.resetForm.value.newPassword != this.resetForm.value.confirmPassword){
      Swal.fire("Both password doesn't match","Please write correct password","error");
    }
    else{
      if(this.resetForm.valid){
        let resetData = { 
          newPassword : this.resetForm.value.newPassword,
          email : localStorage.getItem('email')
        }
        this.loader.start();
        this.authService.resetPassword(resetData).subscribe(
          (success: any) => {
            localStorage.removeItem('email');
            this.router.navigateByUrl(`/admin/auth/login`);
            Swal.fire("Password Reset","Now you can login","success");
            this.loader.stop();
          },
          error => {
            this.loader.stop();
          }
        );
        this.resetForm.reset();
        this.isSubmitted = false;
      }
      else{
        Swal.fire("Enter new password","","warning");
      }
    }
  }

}
