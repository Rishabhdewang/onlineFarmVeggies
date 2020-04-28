import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './../auth/error-handler.service';
import { BaseService } from './../auth/base.service';
import { catchError,retry,map } from 'rxjs/operators';

@Injectable()

export class CartService {

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

    getCart(){
        return this.http.get(this.customer_url + "cart", { observe: "response" }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    addToCart(data){
        return this.http.post(this.customer_url + "cart", data, { observe: "response" }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    removeItems(id){
        return this.http.delete(this.customer_url + "cart/"+id, { observe: "response" }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    checkout(data){
        return this.http.post(this.customer_url + "checkout",data, { observe: "response" }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }
}