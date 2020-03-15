import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './../auth/error-handler.service';
// import { BaseService } from './base.service';
import { catchError,retry,map } from 'rxjs/operators';

@Injectable()

export class ProfileService {

    base_url: string;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
      private http: HttpClient,
      public router: Router,
      // private bs: BaseService,
      private errorHandler: ErrorHandlerService
    ) {
      this.base_url = 'http://127.0.0.1:8000/api/'
    }
  
    getFarmer() {
      return this.http.get(this.base_url + "farmer", { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

    updateFarmer(data){
      return this.http.put(this.base_url + "farmer",data, { observe: "response" }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
    }

}