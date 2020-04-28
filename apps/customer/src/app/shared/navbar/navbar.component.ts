import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../auth/auth.service";
// import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  constructor(
    private authService : AuthService,
    // private cartService : CartService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated =  this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
  }
  
}
