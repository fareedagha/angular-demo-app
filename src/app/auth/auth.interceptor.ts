import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        
        if (this.redirecToLogout(error)) {
          this.router.navigate(['/login']);
        }
        // TODO: handle 403 error ?
        return throwError(error);
      }));
  }

  redirecToLogout(error:any){

    if (error.status === 401 && error.error && error.error.error) {
      if (error.error.error.code === 'UserNotConfirmedException') {
        return false;
      }

      if (error.error.error.code === "NotAuthorizedException") {
        return false;
      }

      if (error.error.error.code === "CodeMismatchException") {
        return false;
      }
      if (error.error.error.code === "AgencyDeactivated") {
        return false;
      }


      return true;
    }
    return false;
  }
}
