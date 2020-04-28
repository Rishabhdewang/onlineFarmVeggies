import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './../auth/error-handler.service';
import { BaseService } from './../auth/base.service';
import { catchError,retry,map } from 'rxjs/operators';
import { data } from '../data/smart-data-table';

@Injectable()

export class AdminOrderService {

    admin_base_url: string;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    constructor(
      private http: HttpClient,
      public router: Router,
      private bs: BaseService,
      private errorHandler: ErrorHandlerService
    ) {
      this.admin_base_url = bs.admin_base_url;
    }
  
    getOrderList() {
      return this.http.get(this.admin_base_url + "order", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    orderDetail(id){
      return this.http.get(this.admin_base_url + "order/"+id, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }
}