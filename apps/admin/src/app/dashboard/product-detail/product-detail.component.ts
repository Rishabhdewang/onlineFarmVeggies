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
    this.productDetail();
  }

  productDetail(){
    if(this.productId){
    this.loader.start();
      this.productService.productDetail(this.productId).subscribe(
        (success: any) => {
          this.product = success.body.data[0];
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
  }
}

deleteProduct(id){
  this.loader.start();
  this.productService.removeProduct(id).subscribe(
    (success :any) =>{
      Swal.fire("Product Removed","","success");
      this.router.navigateByUrl("/farmer/dashboard/product-list");
      this.loader.stop();
    },
    (error)=>{
      this.loader.stop()
    }
  )
}
}
