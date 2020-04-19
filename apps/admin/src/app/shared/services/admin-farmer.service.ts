import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './../auth/error-handler.service';
import { BaseService } from './../auth/base.service';
import { catchError,retry,map } from 'rxjs/operators';
import { data } from '../data/smart-data-table';

@Injectable()

export class AdminFarmerService {

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
  
    getFarmerList() {
      return this.http.get(this.admin_base_url + "farmers", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    getFarmerDetail(id){
      return this.http.get(this.admin_base_url + "farmer/"+id, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    verification(data){
        return this.http.post(this.admin_base_url + "isAdminVerified",data, { observe: "response" }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
          );
    }

    removeFarmer(id){
      return this.http.delete(this.admin_base_url + "removeFarmer/"+id, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    getCategory(){
      return this.http.get(this.admin_base_url + "category", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    addCategory(data){
      return this.http.post(this.admin_base_url + "category",data, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    deleteCategory(id){
      return this.http.delete(this.admin_base_url + "category/"+ id, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

}