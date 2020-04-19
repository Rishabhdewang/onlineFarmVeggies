import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProductService } from '../../shared/services/product.service';
import Swal from "sweetalert2";
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
    private location: Location,
    private productService : CustomerProductService,
    private router : Router,
    private loader : NgxUiLoaderService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe( params => this.productId = params.id );
  }

  ngOnInit(): void {
    this.productDetail();
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
