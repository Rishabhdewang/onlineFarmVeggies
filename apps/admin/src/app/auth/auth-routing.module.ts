import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { RegisterComponent } from './register/register.component';
import { NetworkConnectionComponent } from './network-connection/network-connection.component';
import { ErrorPageComponent } from './error/error-page.component';

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
        path: "noconnection",
        component: NetworkConnectionComponent,
        data : {
          title : "No Internet Connection"
        }
      },
      {
        path : "error",
        component: ErrorPageComponent,
        data : {
          title : "Error"
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
