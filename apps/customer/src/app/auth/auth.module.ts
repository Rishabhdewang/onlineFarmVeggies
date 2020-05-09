import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { DataService } from '../shared/services/data.service';
import { OnetimeOtpVerifyComponent } from './onetime-otp-verify/onetime-otp-verify.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        RegisterComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        VerifyOtpComponent,
        OnetimeOtpVerifyComponent,
        ContactUsComponent
    ],
    providers : [DataService]
})
export class AuthModule { }
