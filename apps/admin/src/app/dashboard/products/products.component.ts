import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import   Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'online-farm-veggies-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : [];
  p: number = 1;
  searchString;
  constructor(
    private productService : ProductService,
    private router : Router,
    private loader : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.productsList();
  }

  productsList(){
    this.loader.start();
    this.productService.products().subscribe(
      (success: any) => {
        console.log(success.body.data);
        this.products = success.body.data;
        this.loader.stop();
      },
      error => {
        console.log(error);
        // Swal.fire("Opps... Login Failed","Please provide correct credential","error");
        this.loader.stop();
      }
    );
  }

deleteProduct(id){
  this.loader.start();
  this.productService.removeProduct(id).subscribe(
    (success :any) =>{
      Swal.fire("Product Removed","","success");
      this.productsList();
      this.loader.stop();
    },
    (error)=>{
      this.loader.stop()
    }
  )
}
}
