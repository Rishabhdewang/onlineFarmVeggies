import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './../auth/error-handler.service';
import { BaseService } from './../auth/base.service';
import { catchError,retry,map } from 'rxjs/operators';

@Injectable()

export class ProfileService {

    customer_url: string;
    admin_base_url : string;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
      private http: HttpClient,
      public router: Router,
      private bs: BaseService,
      private errorHandler: ErrorHandlerService
    ) {
      this.customer_url = bs.customer_url;
    }
  
    customer() {
      return this.http.get(this.customer_url + "customer", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }
    orders(){
        return this.http.get(this.customer_url + "orders", { observe: "response" }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }
    
    addAddress(data){
      return this.http.post(this.customer_url + "address",data, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
    );
    }
    getAddress(id){
      return this.http.get(this.customer_url + "address/"+id, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
    );
    }
    getAddresses(){
      return this.http.get(this.customer_url + "addresses", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
    );
    }
    updateAddress(data){
      return this.http.put(this.customer_url + "address",data, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
    );
    }
    removeAddress(id){
      return this.http.delete(this.customer_url + "address/"+id, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
    );
    }
}