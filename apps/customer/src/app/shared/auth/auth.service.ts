import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { BaseService } from './base.service';
import { catchError,retry,map } from 'rxjs/operators';
import Swal from "sweetalert2";


@Injectable()
export class AuthService {
  // token: string;
  customer_url: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http: HttpClient,
    public router: Router,
    private bs: BaseService,
    private errorHandler: ErrorHandlerService
  ) {
    this.customer_url = bs.customer_url;
  }

  register(data) {
    return this.http.post(this.customer_url + "registerCustomer", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  login(data) {
    return this.http.post(this.customer_url + "customerLogin", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  logout() {   
    if (localStorage.removeItem('token') == null) {
      this.router.navigate(['/']);
      Swal.fire("Logout","","success");
    }
  }

  getToken() {    
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  verifyotp(data){
    return this.http.post(this.customer_url + "verifyOTP", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  resetPassword(data){
    return this.http.post(this.customer_url + "resetPassword", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  checkOldPassword(data){
    return this.http.post(this.customer_url + "checkOldPassword", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  changePassword(data){
    return this.http.post(this.customer_url + "changePassword", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  forgotPassword(data){
    return this.http.post(this.customer_url + "forgotPassword",data,{observe : "response"}).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  sendContactEmail(data){
    return this.http.post(this.customer_url + "sendEmail",data,{observe : "response"}).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  // oneTimeVerification(data){
  //   return this.http.post(this.customer_url + "oneTimeVerify",data, {observe : "response"}).pipe(
  //     retry(3),
  //     catchError(this.errorHandler.handleError)
  //   );
  // }
}
