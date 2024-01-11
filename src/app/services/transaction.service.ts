import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProduct } from '../interfaces/product';
// import { UserStore } from '../@core/stores/user.store';
import * as qs from "qs";
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiUrl: string;
  private transactionAddedSource = new Subject();
  transactionAdded$ = this.transactionAddedSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/transactions';
  }

  addTransaction(data: AddProduct): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateTransaction(id: string, data: AddProduct): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, data);
  }

  getTransaction(id: string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  deleteTransaction(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  getTransactions(params:any): Observable<any> {
    let query = qs.stringify(params);
    console.log('querr', query)
    return this.http.get(this.apiUrl + '?' + query);
  }

  transactionAdded(data: AddProduct | null) {
    this.transactionAddedSource.next(data);
  }
}
