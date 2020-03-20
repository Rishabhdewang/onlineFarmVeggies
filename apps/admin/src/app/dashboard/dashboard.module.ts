import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";


// import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileService } from './../shared/services/profile.service';
import { FarmersComponent } from './farmers/farmers.component';
import { CategoryComponent } from './category/category.component';
import { AdminFarmerService } from '../shared/services/admin-farmer.service';
import { FarmerDetailComponent } from './farmer-detail/farmer-detail.component';



@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    exports: [],
    declarations: [
    UserProfileComponent,
    DashboardComponent,
    ChangePasswordComponent,
    FarmersComponent,
    CategoryComponent,
    FarmerDetailComponent
    ],
    providers: [ProfileService,AdminFarmerService],
})
export class DashboardModule { }
