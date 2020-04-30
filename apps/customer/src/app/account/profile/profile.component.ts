import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProfileService } from '../../shared/services/profile.service';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'online-farm-veggies-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  orders: [];
  addresses: [];
  customer;
  name;
  email;
  @ViewChild("myModal") modal: ElementRef;
  constructor(
    private profileService : ProfileService,
    private loader : NgxUiLoaderService,
    private router : Router,
    private authService : AuthService
  ) { }

  profileUpdateForm = new FormGroup({
    name : new FormControl("",[Validators.required]),
    email: new FormControl("")
  })

  newAddressForm = new FormGroup({
    house_no : new FormControl("", [Validators.required]),
    area : new FormControl("", [Validators.required]),
    city : new FormControl("", [Validators.required]),
    state : new FormControl("", [Validators.required]),
    pincode : new FormControl("", [Validators.required]),
    name : new FormControl("", [Validators.required]),
    mobile_no : new FormControl("", [Validators.required]),
    address_type : new FormControl("home_address", [Validators.required])
  });

  ngOnInit(): void {
    this.getOrders();
    this.getCustomer();
    this.getCustomerAddress();
  }

  addAddress(){
    // console.log(this.newAddressForm.value);
    let data = {
      address : this.newAddressForm.value
    }
    this.loader.start();
    this.profileService.addAddress(data).subscribe(
      (success :any)=>{
        Swal.fire("Address Added","","success");
        this.getCustomerAddress();
        this.loader.stop();
      },
      (error)=>{
        this.loader.stop();
      }
    )
  }

  removeCustomerAddress(id){
    this.loader.start();
    this.profileService.removeAddress(id).subscribe(
      (success :any)=>{
        Swal.fire("Address Removed","","success");
        this.getCustomerAddress();
        this.loader.stop();
      },
      (error)=>{
        this.loader.stop();
      }
    )
  }

  getCustomerAddress(){
    this.loader.start();
    this.profileService.getAddresses().subscribe(
      (success: any) => {
        this.addresses = success.body.data;
        console.log(this.addresses);
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
  }

  updateProfile(){

    console.log(this.profileUpdateForm.value);
  }

  getCustomer(){
    this.loader.start();
    this.profileService.customer().subscribe(
      (success: any) => {
        // console.log(success.body.data);
        this.customer = success.body.data;
        this.name = this.customer.name;
        this.email = this.customer.email;
        this.loader.stop();
      },
      error => {
        this.router.navigateByUrl("/auth/login");
        this.authService.logout();
        this.loader.stop();
      }
    );
  }
  getOrders(){
    this.loader.start();
    this.profileService.orders().subscribe(
      (success: any) => {
        this.orders = success.body.data;
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
  }

}
