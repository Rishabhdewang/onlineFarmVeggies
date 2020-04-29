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
        VerifyOtpComponent
    ],
    providers : [DataService]
})
export class AuthModule { }
