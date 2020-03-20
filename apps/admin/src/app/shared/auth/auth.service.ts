import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
// import { BaseService } from './base.service';
import { catchError,retry,map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  // token: string;
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

  register(data) {
    return this.http.post(this.admin_base_url + "createAdmin", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  login(data) {
    return this.http.post(this.admin_base_url + "adminLogin", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  logout() {   
    if (localStorage.removeItem('token') == null) {
      this.router.navigate(['/admin/auth/login']);
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
    return this.http.post(this.admin_base_url + "farmerVerifyOTP", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  resetPassword(data){
    return this.http.post(this.admin_base_url + "ResetFarmerPassword", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  checkOldPassword(data){
    return this.http.post(this.admin_base_url + "checkOldPassword", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  changePassword(data){
    return this.http.post(this.admin_base_url + "changePassword", data, { observe: "response" }).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  forgotPassword(data){
    return this.http.post(this.admin_base_url + "forgotPassword",data,{observe : "response"}).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}
