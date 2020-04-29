import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './products/products.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomerProductService } from '../shared/services/product.service';
import { CartService } from '../shared/services/cart.service';
import { PaymentComponent } from './payment/payment.component';
import { DataService } from '../shared/services/data.service';
import { ProfileService } from '../shared/services/profile.service';


@NgModule({
    imports : [
        ProductRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports : [
    ProductsComponent,
    ProductDetailComponent,
    ShoppingCartComponent
    ],
    declarations : [
        ProductsComponent,
        ProductDetailComponent,
        ShoppingCartComponent,
        CheckoutComponent,
        PaymentComponent
    ],
    providers: [CustomerProductService,CartService,DataService,ProfileService],
})

export class ProductModule {}