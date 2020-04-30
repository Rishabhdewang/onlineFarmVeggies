import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseService {

  // on local
  // public base_url: string = ' http://192.168.1.106:3000/api/v1/';
  // public farmer_base_url : string = 'http://127.0.0.1:8000/api/farmer/';
  public admin_base_url: string = ' http://127.0.0.1:8000/api/admin/';

  // on live
  // public base_url: string = 'http://13.234.120.28/api/';
  // public farmer_base_url ='https://onlinefarmveggiesapi.herokuapp.com/api/farmer/';
  // public admin_base_url ='https://onlinefarmveggiesapi.herokuapp.com/api/admin/';

  constructor(private http: HttpClient) { }
}
