import { Component, OnInit } from '@angular/core';
import   Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'online-farm-veggies-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  p: number = 1;
  searchString: string;
  orders : [];
  constructor(
    private orderService : OrderService,
    private router : Router,
    private loader : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.orderList();
  }

  orderList(){
    this.loader.start();
    this.orderService.orders().subscribe(
      (success: any) => {
        console.log(success.body.data);
        this.orders = success.body.data;
        this.loader.stop();
      },
      error => {
        this.loader.stop();
      }
    );
  }

}
