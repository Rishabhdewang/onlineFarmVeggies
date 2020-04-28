import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../shared/services/product.service';
import   Swal from "sweetalert2";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'online-farm-veggies-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category;
  products : [];
  constructor(
    private productService : CustomerProductService,
    private router : Router,
    private loader : NgxUiLoaderService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { 
    this.activatedRoute.params.subscribe( params => this.category = params.category );
  }

  ngOnInit(): void {
    this.getProductList();
  }

  // getCategoryProduct(){
  //   this.loader.start();
  //   this.productService.getCategoryProducts(this.category).subscribe(
  //     (success: any) => {

  //       console.log(success.body.data);
  //       this.products = success.body.data;
  //       this.loader.stop();
  //     },
  //     error => {
  //       this.loader.stop();
  //     }
  //   );
  // }
  getProductList(){
    console.log(this.category);
    if(this.category){
      this.loader.start();
      this.productService.getCategoryProducts(this.category).subscribe(
      (success: any) => {

        console.log(success.body.data);
        this.products = success.body.data;
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
    }
    else{
    this.loader.start();
    this.productService.products().subscribe(
      (success: any) => {

        console.log(success.body.data);
        this.products = success.body.data;
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
  }  
}

}
