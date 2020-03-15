import { Component,ElementRef, Renderer2, ViewChild,HostListener, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Product }  from "./product";
import { ProductService } from '../../shared/services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from "sweetalert2";

@Component({
  selector: 'online-farm-veggies-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  isSubmitted :boolean = false;
  selectedCategory : string;
  image : string;
  categories = ["Vegetable","Fruits"];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loader : NgxUiLoaderService,
    private productService : ProductService
  ) { }
  addProductForm: FormGroup;

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productName : [""],
      productCategory : [""],
      productPrices : this.fb.array([]),
      // productTotalQuantity : [""],
      productDetail : this.fb.group({
        productAbout : [""],
        productBenefits : [""],
        productStorageAndUsage : [""],
        otherProductInfo : this.fb.group({
          eanCode: [""],
          bestBefore: [""],
          sourcedAndMarketed: [""]
        })
      })
    })
  }

  get productPrices() {
    return this.addProductForm.get('productPrices') as FormArray;
  }
  addProductPrices() {
    this.productPrices.push(this.fb.group({quantity:"",rate:""}));
  }
  deleteProductPrices(index) {
    this.productPrices.removeAt(index);
  }

  uploadFile(event) {
    this.image = event.target.files[0].name;
    let label = document.getElementById("custom-file-label");
    label.innerHTML = this.image;
  }

  // selectCategory(event){
  //   this.selectedCategory = event.target.value;
  //   console.log(this.selectedCategory);
  // }

  onSubmit(){
    console.log(this.addProductForm.value);
    if(this.addProductForm.valid){
      let addProductData = this.addProductForm.value;
      this.loader.start();
      this.productService.product(addProductData).subscribe(
        (success: any) => {
          // console.log("this is success: " + JSON.stringify(success));

          // localStorage.setItem("token", success.headers.get("Authorization"));
          // console.log(localStorage.getItem('token'));

          this.router.navigateByUrl(`/dashboard/add-product`);
          Swal.fire("Prodect Added Successfully","","success");
          // alertFunctions.typeSuccess();
          this.loader.stop();
        },
        error => {
          console.log(error);

          Swal.fire("Enter Complete Information","","error");
          this.loader.stop();
        }
      );
      this.addProductForm.reset();
      this.isSubmitted = false;
    }
  }
}
