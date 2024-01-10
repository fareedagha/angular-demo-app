// data.service.ts
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'user';

  setData(data: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getData(): User {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  removeData() {
    localStorage.removeItem(this.storageKey);
  }

  AuthenticatedUser(): boolean {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? true : false;
  }

  getAccessToken(): string | undefined {
    const user: User | null = this.getItem(this.storageKey);
    return user?.token;
  }

  getItem(key: string): User | null {
    const value = localStorage.getItem(key);
    try {
      return value !== null ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  }
}
