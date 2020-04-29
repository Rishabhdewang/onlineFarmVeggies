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
        // console.log(error);
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error;
            Swal.fire("Error",errorMessage,"error");
        }
        else {
            if(error.status === 401){
            errorMessage = error.error.message;
            Swal.fire(errorMessage,"Please login again","error");
            this.router.navigateByUrl("/farmer/auth/login");
            }
            else{
            errorMessage = error.error;
            Swal.fire("Server error",errorMessage,"error");
            }
        }
        return throwError(error);
    }

    routeAccordingToError(error) {
        Swal.fire("Error",error.error,"error");
        if (error.status === 401) {
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
