import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error/error-page.component';
import { OnetimeOtpVerifyComponent } from './onetime-otp-verify/onetime-otp-verify.component';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
        VerifyOtpComponent,
        RegisterComponent,
        ErrorPageComponent,
        OnetimeOtpVerifyComponent
    ]
})
export class AuthModule { }
