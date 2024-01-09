// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'accessToken';

  setData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getData(): any {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  removeData() {
    localStorage.removeItem(this.storageKey);
  }

  AuthenticatedUser(): any {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? true : false;
  }

  getAccessToken() {
    return this.getItem(this.storageKey);
  }

  getItem(key: string): string | null {
    const value = localStorage.getItem(key);
    try {
      return value !== null ? JSON.parse(value) : null;
    } catch (e) {
      return null;
    }
  }

}
