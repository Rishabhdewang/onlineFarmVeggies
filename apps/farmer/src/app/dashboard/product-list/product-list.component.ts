import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import   Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'online-farm-veggies-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // rows = [];
  products : [];
  p: number = 1;
  searchString: string;
  constructor(
    private productService : ProductService,
    private router : Router,
    private loader : NgxUiLoaderService
  ) { 
    // this.rows = data;
  }

  ngOnInit(): void {
    this.productsList();
  }

  productsList(){
      this.loader.start();
      this.productService.products().subscribe(
        (success: any) => {
          // console.log("this is success: " + JSON.stringify(success));

          // localStorage.setItem("token", success.headers.get("Authorization"));
          // console.log(localStorage.getItem('token'));
          console.log(success.body.data);
          this.products = success.body.data;
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
