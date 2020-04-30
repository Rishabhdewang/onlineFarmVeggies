import {
  Component,
  OnInit
} from '@angular/core';
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
import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'online-farm-veggies-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  address = "Bengali Square,Indore,MP,453022";
  addresses : [];
  itemId;
  cart;
  itemCount = 0;
  totalPrice = 0;
  totalAmount = 0;
  itemsAvailable: boolean = false;
  constructor(
    private authService: AuthService,
    private productService: CustomerProductService,
    private profileService : ProfileService,
    private cartService: CartService,
    private dataService: DataService,
    private router: Router,
    private loader: NgxUiLoaderService,
  ) { }

  shippingAddressForm = new FormGroup({
    shippingAddress: new FormControl("", [Validators.required])
  });

  ngOnInit(): void {
    this.getCart();
    this.getCustomerAddresses();
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
        this.loader.stop();
      }
    );
  }

  onSubmit() {
    this.setData();
    // this.address = "Bengali Square,Indore,MP,453022";
    // console.log(this.address);
    this.router.navigateByUrl('/product/payment');
  }

  getCustomerAddresses(){
    this.loader.start();
    this.profileService.getAddresses().subscribe(
      (success: any) => {
        this.addresses = success.body.data;
        // console.log(this.addresses);
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
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

  setData() {
    for (let i = 0; i < this.itemCount; i++) {
      this.dataService.setData("shippingAddress",this.address);
      this.dataService.setData("billingAddress",this.address);
    }                                                          
  }

}
