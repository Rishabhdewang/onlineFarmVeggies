import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../shared/services/product.service';
import   Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'online-farm-veggies-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss']
})
export class BestSellerComponent implements OnInit {

  bestSellers : [];
  isBestSeller : boolean = false;
  constructor(
    private productService : CustomerProductService,
    private router : Router,
    private loader : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.getbestSellerList();
  }

  getbestSellerList(){
    this.loader.start();
    this.productService.getBestSeller().subscribe(
      (success: any) => {
        this.bestSellers = success.body.data;
        if(this.bestSellers.length > 0) this.isBestSeller = true;
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
  }  


}
