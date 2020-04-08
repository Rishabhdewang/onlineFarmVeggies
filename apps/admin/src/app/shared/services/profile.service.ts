import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './../auth/error-handler.service';
// import { BaseService } from './base.service';
import { catchError,retry,map } from 'rxjs/operators';

@Injectable()

export class ProfileService {

    admin_base_url: string;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
      private http: HttpClient,
      public router: Router,
      // private bs: BaseService,
      private errorHandler: ErrorHandlerService
    ) {
      this.admin_base_url = 'http://127.0.0.1:8000/api/admin/'
    }
  
    getFarmer() {
      return this.http.get(this.admin_base_url + "admin", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    updateFarmer(data){
      return this.http.put(this.admin_base_url + "farmer",data, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

}