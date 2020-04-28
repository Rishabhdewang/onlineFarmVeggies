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
  categories = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loader : NgxUiLoaderService,
    private productService : ProductService
  ) { }
  addProductForm: FormGroup;

  ngOnInit(): void {
    this.getCategories();

    this.addProductForm = this.fb.group({
      productName : [""],
      productCategory : [""],
      productPrices : this.fb.array([]),
      product_image : [""],
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
    this.image = event.target.files[0];
    let label = document.getElementById("custom-file-label");
    label.innerHTML = this.image;
  }

  // selectCategory(event){
  //   this.selectedCategory = event.target.value;
  //   console.log(this.selectedCategory);
  // }

  getCategories(){
    this.loader.start();
    this.productService.categories().subscribe(
      (success: any)=>{
        this.categories = success.body.data;
      },
      (error)=>{
        console.log(error);
          // Swal.fire("Erro","","error");
          this.loader.stop();
      }
    )
  }

  onSubmit(){
    console.log(this.addProductForm.value);
    let formData: FormData = new FormData();
    formData.append("data", JSON.stringify(this.addProductForm.value));
    formData.append("product_image",this.image);

    if(this.addProductForm.valid){
      // let addProductData = this.addProductForm.value;
      this.loader.start();
      this.productService.product(formData).subscribe(
        (success: any) => {
          this.router.navigateByUrl(`/farmer/dashboard/add-product`);
          Swal.fire("Prodect Added Successfully","","success");
          this.loader.stop();
        },
        error => {
          this.loader.stop();
        }
      );
      this.addProductForm.reset();
      this.isSubmitted = false;
    }
  }
}
