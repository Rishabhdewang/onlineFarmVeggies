import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
      if(this.authService.isAuthenticated() != true){
        this.router.navigate(['/farmer/auth/login']);
        return false;
      }
      return true;
  }
}
