import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from "@angular/router";
import { AdminFarmerService } from "../../shared/services/admin-farmer.service";
import Swal from "sweetalert2";
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'online-farm-veggies-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  isSubmitted = false;
  categories : [];

  constructor(
    private loader : NgxUiLoaderService,
    private farmerService : AdminFarmerService,
    private router : Router
  ) { }

  categoryForm = new FormGroup({
    categoryName : new FormControl("",[Validators.required])
  })

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
      this.loader.start();
      this.farmerService.getCategory().subscribe(
        (success: any) => {

          // this.router.navigateByUrl(`/admin/dashboard/category`);
          this.categories = success.body.data;
          console.log(this.categories);
          this.loader.stop();
        },
        error => {
          console.log(error);

          Swal.fire("Request Failed","Please try again !!!","error");
          this.loader.stop();
        }
      );
  }

  onSubmit(){
    if(this.categoryForm.valid){
      let categoryData = this.categoryForm.value;
      this.loader.start();
      this.farmerService.addCategory(categoryData).subscribe(
        (success: any) => {

          this.router.navigateByUrl(`/admin/dashboard/category`);
          Swal.fire("Category Added","","success");
          this.getCategories();
          this.loader.stop();
        },
        error => {
          console.log(error);

          Swal.fire("Request Failed","Please try again !!!","error");
          this.loader.stop();
        }
      );
      this.categoryForm.reset();
      this.isSubmitted = false;
    }
  }

  deleteCategory(data){
    console.log(data);
    this.loader.start();
      this.farmerService.deleteCategory(data).subscribe(
        (success: any) => {
          
          Swal.fire("Category Removed","","warning");
          this.getCategories();
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
