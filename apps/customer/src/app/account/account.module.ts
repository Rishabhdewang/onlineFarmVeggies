import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AccountRoutingModule } from './account-routing.module';
import { ProfileService } from '../shared/services/profile.service';



@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
       ProfileComponent
    ],
    providers : [ProfileService]
})
export class AccountModule { }
