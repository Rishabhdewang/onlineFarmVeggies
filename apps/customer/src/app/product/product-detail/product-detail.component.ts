import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProductService } from '../../shared/services/product.service';
import Swal from "sweetalert2";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'online-farm-veggies-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId : number;
  product;
  constructor(
    private location: Location,
    private authService : AuthService,
    private productService : CustomerProductService,
    private cartService : CartService,
    private router : Router,
    private loader : NgxUiLoaderService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe( params => this.productId = params.id );
  }

  ngOnInit(): void {
    this.productDetail();
  }

  AddToCart(){
    console.log(this.productId);
    if(this.product){
      let formData = {
        "productId" : Number(this.product.id),
      }
      this.loader.start();
      this.cartService.addToCart(formData).subscribe(
        (success: any) => {
          Swal.fire("Item Added to Cart","","success");
          // this.router.navigateByUrl(`/`);
          this.loader.stop();
        },
        error => {
          console.log(error);
          this.authService.logout();
          this.router.navigateByUrl(`/auth/login`);
          Swal.fire("Login first","Please login to add item to cart","error");
          this.loader.stop();
        }
      );
    }
  }

  productDetail(){
    console.log(this.productId);
      if(this.productId){
      this.loader.start();
        this.productService.productDetail(this.productId).subscribe(
          (success: any) => {
            console.log(success.body.data);
            this.product = success.body.data[0];
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
