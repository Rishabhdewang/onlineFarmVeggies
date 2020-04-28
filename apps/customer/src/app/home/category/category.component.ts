import { Component, OnInit } from '@angular/core';
import { CustomerProductService } from '../../shared/services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'online-farm-veggies-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  categories : [];
  constructor(
    private customerService : CustomerProductService,
    private router : Router,
    private loader : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.loader.start();
    this.customerService.categories().subscribe(
      (success: any) => {

        // this.router.navigateByUrl(`/admin/dashboard/category`);
        this.categories = success.body.data;
        // console.log(this.categories);
        this.loader.stop();
      },
      error => {
        console.log(error);

        Swal.fire("Request Failed","Please try again !!!","error");
        this.loader.stop();
      }
    );
}
}
