import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import   Swal from "sweetalert2";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'online-farm-veggies-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId : number;
  product;
  constructor(
    private location:Location,
    private productService : ProductService,
    private router : Router,
    private loader : NgxUiLoaderService,
    private activatedRoute:ActivatedRoute
  ) {
    // this.productId = this.router.getCurrentNavigation().extras.state.id;
    this.activatedRoute.params.subscribe( params => this.productId = params.id );
   }

  ngOnInit(): void {
    this.productDetail()
  }

  productDetail(){
    if(this.productId){
    this.loader.start();
      this.productService.productDetail(this.productId).subscribe(
        (success: any) => {
          // console.log("this is success: " + JSON.stringify(success));

          // localStorage.setItem("token", success.headers.get("Authorization"));
          // console.log(localStorage.getItem('token'));
          console.log(success.body.data);
          this.product = success.body.data[0];
          // this.router.navigateByUrl(`/dashboard/product`);
          // Swal.fire("Product","Welcome to Dashbord","success");
          // alertFunctions.typeSuccess();
          this.loader.stop();
        },
        error => {
          console.log(error);
          // Swal.fire("Opps... Login Failed","Please provide correct credential","error");
          this.loader.stop();
        }
      );
  }
}
}
