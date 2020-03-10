import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseService {

  // on local
  // public base_url: string = ' http://192.168.1.106:3000/api/v1/';
  public base_url: string = ' http://127.0.0.1:8000/api/';

  // on live
  // public base_url: string = 'http://13.234.120.28/api/';
  // public admin_url: string = 'http://13.234.120.28/api/v1/';

  constructor(private http: HttpClient) { }
}
