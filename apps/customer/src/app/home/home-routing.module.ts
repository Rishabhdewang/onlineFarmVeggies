import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { BannerComponent } from './banner/banner.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        children: [
          {
            path : "",
            component : HomeComponent,
            data : {
              title : "Home"
            }
          },
          // {
          //     path : "best-seller",
          //     component : BestSellerComponent,
          //     data : {
          //         title : "Best Seller"
          //     }
          // }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {
}
