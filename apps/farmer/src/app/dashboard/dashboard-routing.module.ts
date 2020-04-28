import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path : "dashboard",
        component : DashboardComponent,
        data : {
          title : "Dashboard"
        }
      },
      {
        path : "product-list",
        component : ProductListComponent,
        data : {
          title : "Product List"
        }
      },
      {
        path : "add-product",
        component : AddProductComponent,
        data : {
          title : "Add Product"
        }
      },
      {
        path : "user-profile",
        component : UserProfileComponent,
        data : {
          title : "User Profile"
        }
      },
      {
        path : "change-password",
        component : ChangePasswordComponent,
        data :{
          title : "Change Password"
        }
      },
      {
        path : "productDetail/:id",
        component : ProductDetailComponent,
        data:{
          title : "Product Detail"
        }
      },
      {
        path : "orders",
        component : OrdersComponent,
        data:{
          title : "Orders"
        }
      },
      {
        path : "order-detail/:id",
        component : OrderDetailComponent,
        data:{
          title : "Order Detail"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
