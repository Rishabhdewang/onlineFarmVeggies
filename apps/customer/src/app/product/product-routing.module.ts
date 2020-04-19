import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

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
            path: "shopping-cart",
            component: ShoppingCartComponent,
            data:{
              title: "Shopping Cart"
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
