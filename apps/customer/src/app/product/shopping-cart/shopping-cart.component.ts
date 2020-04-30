import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProductService } from '../../shared/services/product.service';
import Swal from "sweetalert2";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'online-farm-veggies-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  itemId;
  cart;
  itemCount = 0;
  totalPrice = 0;
  totalAmount = 0;
  itemsAvailable : boolean = false;
  constructor(
    private location: Location,
    private authService : AuthService,
    private productService : CustomerProductService,
    private cartService : CartService,
    private router : Router,
    private loader : NgxUiLoaderService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
      this.loader.start();
        this.cartService.getCart().subscribe(
          (success: any) => {
            this.cart = success.body.data;
            this.itemCount = this.cart.length;
            console.log(this.cart);
            if(this.itemCount > 0) this.itemsAvailable = true;
            this.totalPrice = this.getPrice();
            this.totalAmount = this.getTotalAmount();
            this.loader.stop();
          },
          error => {
            this.router.navigateByUrl('/auth/login');
            Swal.fire("Please login first to see your cart","","warning");
            this.loader.stop();
          }
        );
  }

  removeItem(id){
    this.itemId = id;
    if(this.itemId){
      this.loader.start();
      this.cartService.removeItems(this.itemId).subscribe(
        (success: any) => {
          // Swal.fire("Item Removed","","info");  
          this.getCart();
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
  }
}


getPrice(){
  var Price = 0;
  var prices = [];
  for (let index = 0; index < this.cart.length; index++) {
    prices = this.cart[index].product.productPrices;
    Price += prices.reduce((accum,item) => accum + item.rate, 0)
  }
  return Price;
}

getTotalAmount(){
  var amount = 0;
  if(this.totalPrice <= 500){
    amount = this.totalPrice;
  }
  else {
    amount = 50 + this.totalPrice;
  }
  return amount;
}

}
