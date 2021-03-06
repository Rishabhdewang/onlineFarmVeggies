import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import   Swal from "sweetalert2";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminCustomerService } from '../../shared/services/admin-customer.service';


@Component({
  selector: 'online-farm-veggies-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customerId;
  customer;

  constructor(
    private location:Location,
    private customerService : AdminCustomerService,
    private router : Router,
    private loader : NgxUiLoaderService,
    private activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe( params => this.customerId = params.id );
  }

  ngOnInit(): void {
    this.getcustomerDetail();
  }


  changeVerification(status){
    if(this.customerId){
      let formData = {
        "id" : Number(this.customerId),
        "name" : this.customer.name,
        "isEmailVerified" : status
      }
      this.loader.start();
      this.customerService.verification(formData).subscribe(
        (success: any) => {
          this.getcustomerDetail();
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
    }
  }

  getcustomerDetail(){
    if(this.customerId){
    this.loader.start();
      this.customerService.customerDetail(this.customerId).subscribe(
        (success: any) => {
          this.customer = success.body.data[0];
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
  }
}

  removeCustomer(){
    if(this.customerId){
      this.loader.start();
      this.customerService.removeCustomer(this.customerId).subscribe(
        (success: any) => {
          this.router.navigateByUrl("/admin/dashboard/customer");
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
    }
}

}
