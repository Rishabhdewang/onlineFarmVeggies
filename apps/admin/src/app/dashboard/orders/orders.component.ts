import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from '../../shared/services/admin-orders.service';
import   Swal from "sweetalert2";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'online-farm-veggies-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders = [];
  p: number = 1;
  searchString;
  constructor(
    private orderService : AdminOrderService,
    private router : Router,
    private loader : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.orderList();
  }

  orderList(){
    this.loader.start();
    this.orderService.getOrderList().subscribe(
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
