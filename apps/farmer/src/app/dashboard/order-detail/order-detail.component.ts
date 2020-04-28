import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import   Swal from "sweetalert2";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'online-farm-veggies-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderId;
  order;
  constructor(
    private location:Location,
    private orderService : OrderService,
    private router : Router,
    private loader : NgxUiLoaderService,
    private activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe( params => this.orderId = params.id );
  }

  ngOnInit(): void {
    this.orderDetails();
  }

  orderDetails(){
    if(this.orderId){
    this.loader.start();
      this.orderService.orderDetail(this.orderId).subscribe(
        (success: any) => {
          this.order = success.body.data[0];
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
  }
}
}
