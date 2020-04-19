import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from './home-routing.module';
import { BannerComponent } from './banner/banner.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { OffersComponent } from './offers/offers.component';
import { CategoryComponent } from './category/category.component';
import { CustomerProductService } from '../shared/services/product.service';


@NgModule({
    imports : [
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports : [
        BannerComponent,
        BestSellerComponent,
        CategoriesComponent,
        OffersComponent,
        CategoryComponent
    ],
    declarations : [
        BannerComponent,
        BestSellerComponent,
        HomeComponent,
        CategoriesComponent,
        OffersComponent,
        CategoryComponent
    ],
    providers : [CustomerProductService]
})

export class HomeModule {}