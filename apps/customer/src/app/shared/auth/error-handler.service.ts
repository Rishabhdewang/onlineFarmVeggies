import { Injectable } from '@angular/core';
// import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { CookieService } from 'ngx-cookie';
// import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    role: string;
    userType: string;
    constructor(
        // private messageService: MessageService,
        private router: Router,
        // private cookieService: CookieService

    ) {
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage: any;
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error.message}`
            );
            errorMessage = error.error.message || error.message;
            Swal.fire("Error",errorMessage,"error");
        }
        return throwError(error);
    }

    routeAccordingToError(error) {
        // generic error message toast
        // this.messageService.add({
        //     severity: 'error',
        //     summary: `${error.error.message}`
        // });
        Swal.fire("Error",error.error.message,"error");
        // if verification link is not valid
        if (
            error.error.message ===
            'Either invalid link or link is expired or already used' ||
            error.error.statusCode === 401
        ) {
            setTimeout(() => {
                this.redirectToLogin();
            }, 3000);
        }
    }

    redirectToLogin() {
        localStorage.removeItem('token');
        this.router.navigateByUrl(`/farmer/auth/login`);
    }
}
