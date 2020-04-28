import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminCustomerService } from "../../shared/services/admin-customer.service";
import Swal from "sweetalert2";

@Component({
  selector: 'online-farm-veggies-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers = [];

  constructor(
    private loader : NgxUiLoaderService,
    private customerService : AdminCustomerService
  ) {
   }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.loader.start();
    this.customerService.getCustomerList().subscribe(
      (success: any) => {
        this.customers = success.body.data;
        console.log(this.customers);
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
  }

  verify(){

  }


}
