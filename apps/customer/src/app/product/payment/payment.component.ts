import { Component, OnInit } from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  CustomerProductService
} from '../../shared/services/product.service';
import Swal from "sweetalert2";
import {
  NgxUiLoaderService
} from 'ngx-ui-loader';
import {
  CartService
} from '../../shared/services/cart.service';
import {
  AuthService
} from '../../shared/auth/auth.service';
import {
  DataService
} from '../../shared/services/data.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'online-farm-veggies-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  itemId;
  cart;
  itemCount = 0;
  totalPrice = 0;
  totalAmount = 0;
  itemsAvailable: boolean = false;
  constructor(
    private authService: AuthService,
    private productService: CustomerProductService,
    private cartService: CartService,
    private dataService: DataService,
    private router: Router,
    private loader: NgxUiLoaderService,
  ) { }

  paymentForm = new FormGroup({
    paymentMode: new FormControl("upi", [Validators.required])
  });

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.loader.start();
    this.cartService.getCart().subscribe(
      (success: any) => {
        this.cart = success.body.data;
        this.itemCount = this.cart.length;
        console.log(this.itemCount);
        if (this.itemCount > 0) this.itemsAvailable = true;
        this.totalPrice = this.getPrice();
        this.totalAmount = this.getTotalAmount();
        this.loader.stop();
      },
      error => {
        console.log(error);
        // this.router.navigateByUrl('/auth/login');
        Swal.fire("Please login first to see your cart", "", "error");
        this.loader.stop();
      }
    );
  }

  onSubmit(){
    var billingAddress = this.dataService.getData("billingAddress");
    var shippingAddress = this.dataService.getData("shippingAddress");
    if(billingAddress === undefined || shippingAddress === undefined){
      Swal.fire("Enter Billing and Shipping","","error");
      this.router.navigateByUrl("/product/checkout");
    }
    else {
      let data = this.getDatas();
      console.log(data);
      if(this.paymentForm.valid){
        this.cartService.checkout(data).subscribe(
          (success: any) =>{
            Swal.fire("Order Placed","Order is placed","success");
            this.clearCart();
          },
          error => {
            console.log(error);
            if(error.error.code == 406){
              Swal.fire(error.error.message,"","warning");
            }
            // Swal.fire("Opps... Login Failed","Please provide correct credential","error");
            this.loader.stop();
          }
        )
      }
    }
  }

  getPrice() {
    var Price = 0;
    var prices = [];
    for (let index = 0; index < this.cart.length; index++) {
      prices = this.cart[index].product.productPrices;
      Price += prices.reduce((accum, item) => accum + item.rate, 0)
    }
    return Price;
  }

  getTotalAmount() {
    var amount = 0;
    if (this.totalPrice <= 500) {
      amount = this.totalPrice;
    } else {
      amount = 50 + this.totalPrice;
    }
    return amount;
  }

  clearCart(){
    for (let i = 0; i < this.itemCount; i++) {
      this.cartService.removeItems(this.cart[i].id).subscribe(
        (success:any)=>{
         this.router.navigateByUrl("/"); 
        }
      )
    }
  }
  
  getDatas(){
    var dataArray = [];
    for (let i = 0; i < this.itemCount; i++) {
      console.log(this.cart[i]);
      var data = {
        customerId : this.cart[i].customerId,
        productId : this.cart[i].productId,
        farmerId : this.cart[i].product.farmerId,
        shippingAddress : this.dataService.getData("shippingAddress"),
        billingAddress : this.dataService.getData("billingAddress"),
        paymentMode : this.paymentForm.value.paymentMode,
        orderStatus : "placed"
      }
      dataArray.push(data);
  }
  return dataArray;
}
}
