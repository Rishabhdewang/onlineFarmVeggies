import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NetworkService} from './network.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkGuardService {
  constructor(private router: Router, private network: NetworkService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (window.navigator.onLine) {
      return true;
    } else {
      if (!this.isConnectionLostComponent()) {
        this.router.navigate(['/admin/auth/noconnection'], {skipLocationChange: true});
      }
      return false;
    }
  }

  private isConnectionLostComponent() {
    // check whether connection lost component is added on not
    return this.network.isActive;
  }
}
