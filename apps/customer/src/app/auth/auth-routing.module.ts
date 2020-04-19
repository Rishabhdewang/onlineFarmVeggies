import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

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
          path: "login",
          component: LoginComponent,
          data:{
              title: "Login"
          }
      },
      {
        path: "forgotPassword",
        component: ForgotPasswordComponent,
        data: {
          title : "Forgot Password"
        }
      },
      {
        path: "resetPassword",
        component: ResetPasswordComponent,
        data: {
          title : "Reset Password"
        }
      },
      {
        path: "verifyotp",
        component: VerifyOtpComponent,
        data: {
          title : "Verify OTP"
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