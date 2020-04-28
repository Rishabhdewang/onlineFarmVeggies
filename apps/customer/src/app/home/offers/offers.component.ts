import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../shared/services/product.service';
import   Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'online-farm-veggies-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers : [];
  isOffer : boolean = false;
  constructor(
    private productService : CustomerProductService,
    private router : Router,
    private loader : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.getOffersList();
  }

  getOffersList(){
    this.loader.start();
    this.productService.getOffers().subscribe(
      (success: any) => {

        console.log(success.body.data);
        this.offers = success.body.data;
        if(this.offers.length > 0) this.isOffer = true;
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
  }  

}
