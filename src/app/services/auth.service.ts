import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Forgotpassword, Login, Register } from './../interfaces/auth';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private dataService: DataService) {
    this.apiUrl = environment.apiUrl + '/auth';
  }
  apiUrl: string;
  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(data: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  forgotPassword(data: Forgotpassword): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-forgot-password`, data);
  }

  logout(): void {
    this.dataService.removeData();
    this.loggedIn.next(false);
  }
}
