import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseService {

  // on local
  public admin_url: string = ' http://127.0.0.1:8000/api/admin/';
  public farmer_url: string = ' http://127.0.0.1:8000/api/farmer/';
  public customer_url: string = ' http://127.0.0.1:8000/api/customer/';

  // on live
  // public base_url: string = 'http://13.234.120.28/api/';
  // public admin_url: string = 'https://onlinefarmveggiesapi.herokuapp.com/api/admin/';
  // public farmer_url: string = 'https://onlinefarmveggiesapi.herokuapp.com/api/farmer/';
  // public customer_url: string = 'https://onlinefarmveggiesapi.herokuapp.com/api/customer/';

  constructor(private http: HttpClient) { }
}
