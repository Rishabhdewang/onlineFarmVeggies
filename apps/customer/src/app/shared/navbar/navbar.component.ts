import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../auth/auth.service";
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
// import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated;
  constructor(
    private authService : AuthService,
    private router : Router,
    private dataService : DataService
    // private cartService : CartService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated =  this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
  }
  
}
