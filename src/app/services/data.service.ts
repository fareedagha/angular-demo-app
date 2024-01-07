// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private storageKey = 'auth_data';

  setData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getData(): any {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }
  removeData(){
    localStorage.removeItem(this.storageKey);
  }

  AuthenticatedUser(): any {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? true : false;
  }
}
