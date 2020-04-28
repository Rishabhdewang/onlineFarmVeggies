import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}` 
            }
        });
        return next.handle(req);
    }
}