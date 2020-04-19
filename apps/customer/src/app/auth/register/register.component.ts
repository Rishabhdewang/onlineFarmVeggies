import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'online-farm-veggies-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isSubmitted: boolean;
  public error;

  constructor(
    // private router: Router,
    // private loader : NgxUiLoaderService,
    // private authService : AuthService
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

}
