import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './../auth/error-handler.service';
// import { BaseService } from './base.service';
import { catchError,retry,map } from 'rxjs/operators';

@Injectable()

export class ProductService {

    farmer_base_url: string;
    admin_base_url : string;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
      private http: HttpClient,
      public router: Router,
      // private bs: BaseService,
      private errorHandler: ErrorHandlerService
    ) {
      this.farmer_base_url = 'http://127.0.0.1:8000/api/farmer/',
      this.admin_base_url = 'http://127.0.0.1:8000/api/admin/'
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

    categories(){
      return this.http.get(this.admin_base_url + "category", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

}