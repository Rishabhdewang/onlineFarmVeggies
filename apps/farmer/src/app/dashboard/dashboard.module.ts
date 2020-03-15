import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";


// import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductService } from "./../shared/services/product.service";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProfileService } from './../shared/services/profile.service';



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
    ProductListComponent,
    AddProductComponent,
    ProductDetailComponent,
    UserProfileComponent,
    DashboardComponent,
    ChangePasswordComponent
    ],
    providers: [ProductService,ProfileService],
})
export class DashboardModule { }
