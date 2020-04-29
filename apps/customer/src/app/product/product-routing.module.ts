import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuard } from '../shared/auth/auth-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
    {
        path: '',
        children: [
          {
            path : "products",
            component : ProductsComponent,
            data : {
              title : "Products"
            }
          },
          {
            path: "product-detail/:id",
            component: ProductDetailComponent,
            data:{
              title:"Product Detail"
            }
          },
          {
            path : "category-products/:category",
            component : ProductsComponent,
            data : {
              title : "Category Product List"
            }
          },
          {
            path: "shopping-cart",
            component: ShoppingCartComponent,
            canActivate: [AuthGuard],
            data:{
              title: "Shopping Cart"
            }
          },
          {
            path: "checkout",
            component: CheckoutComponent,
            canActivate: [AuthGuard],
            data :{
              title : "Checkout"
            }
          },
          {
            path: "payment",
            component: PaymentComponent,
            canActivate: [AuthGuard],
            data: {
              title: "Payment"
            }
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule {
}
