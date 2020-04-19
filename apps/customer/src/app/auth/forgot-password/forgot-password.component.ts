import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'online-farm-veggies-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public error;
  isSubmitted: boolean;
  constructor(
    // private loader: NgxUiLoaderService, 
    // private router: Router, 
    // private authService: AuthService
    ) { }
  ngOnInit(): void {
  }
  check_email() {
    this.error = "";
  }
  forgotForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  });

}
