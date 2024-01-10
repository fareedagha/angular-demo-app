import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Login, Register } from './../interfaces/auth';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/users';
  }
  apiUrl: string;
  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  register(data: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
    // this.loggedIn.next(true);
  }
}
