import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error/error-page.component';
import { OnetimeOtpVerifyComponent } from './onetime-otp-verify/onetime-otp-verify.component';

// import { Dashboard2Component } from "./dashboard2/dashboard2.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "register",
        component : RegisterComponent,
        data:{
          title: "Register"
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
        data: {
          title: 'Forgot Password'
        }
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password'
        }
      },
      {
        path : 'verifyOTP',
        component : VerifyOtpComponent,
        data : {
          title : "Verify OTP"
        }
      },
      {
        path: "error",
        component : ErrorPageComponent,
        data : {
          title : "Error"
        }
      },
      {
        path: "verifyonetimeotp",
        component: OnetimeOtpVerifyComponent,
        data: {
          title : "Verify One Time OTP"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
