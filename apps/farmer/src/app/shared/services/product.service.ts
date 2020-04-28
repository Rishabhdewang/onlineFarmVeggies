import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './../auth/error-handler.service';
import { BaseService } from './../auth/base.service';
import { catchError,retry,map } from 'rxjs/operators';

@Injectable()

export class ProductService {

    farmer_base_url: string;
    admin_base_url : string;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
      private http: HttpClient,
      public router: Router,
      private bs: BaseService,
      private errorHandler: ErrorHandlerService
    ) {
      this.farmer_base_url = bs.farmer_url,
      this.admin_base_url = bs.admin_url
    }
  
    products() {
      return this.http.get(this.farmer_base_url + "products", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }
    product(data){
      return this.http.post(this.farmer_base_url + "product",data, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    productDetail(data){
      return this.http.get(this.farmer_base_url + "product/"+data, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    orders(){
      return this.http.get(this.farmer_base_url + "order", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    categories(){
      return this.http.get(this.admin_base_url + "category", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

}