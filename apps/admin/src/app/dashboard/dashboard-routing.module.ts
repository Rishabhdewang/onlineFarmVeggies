import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FarmersComponent } from './farmers/farmers.component';
import { CategoryComponent } from './category/category.component';
import { FarmerDetailComponent } from './farmer-detail/farmer-detail.component';


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
        path : "farmers",
        component : FarmersComponent,
        data : {
          title : "Farmers List"
        }
      },
      {
        path : "category",
        component : CategoryComponent,
        data : {
          title : "Category"
        }
      },
      {
        path : "farmer-detail/:id",
        component : FarmerDetailComponent,
        data : {
          title : "Farmer Detail"
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
