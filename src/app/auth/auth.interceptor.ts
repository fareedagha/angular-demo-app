import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dataService: DataService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.dataService.getAccessToken();
    let requestItem = request;
    if (token) {
      requestItem = request.clone({
        headers: request.headers.append('Authorization',
          `Bearer ${token}`)
      });
    }
    return next.handle(requestItem).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // letting it pass
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.dataService.removeData();
          this.router.navigate(['/login']);
        }
      }
    }));
  }
}
