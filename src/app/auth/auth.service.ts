// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string): void {
    // Add authentication logic here (e.g., communicate with a server)
    // For simplicity, let's just set a dummy loggedIn status
    this.loggedIn.next(true);
  }

  logout(): void {
    this.loggedIn.next(false);
  }
}
