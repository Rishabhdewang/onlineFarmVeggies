import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = {}

  public isAuthenticated;
 
  setData(arg,value){
    this.data[arg] = value;
  }

  getData(value){
    return this.data[value];
  }
  
}
