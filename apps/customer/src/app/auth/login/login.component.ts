import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'online-farm-veggies-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted: boolean;
  public error;

  constructor(
    // private router: Router,
    // private loader : NgxUiLoaderService,
    // private authService : AuthService
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


}
