import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'online-farm-veggies-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isSubmitted: boolean;
  public error;
  constructor(
    // private router : Router,
    // private loader : NgxUiLoaderService,
    // private authService :AuthService
  ) { }

  ngOnInit(): void {
  }

  resetForm = new FormGroup({
    newPassword : new FormControl('',[Validators.required]),
    confirmPassword : new FormControl('',[Validators.required])
  })

  check_password(){
    this.error = "";
  }

}
