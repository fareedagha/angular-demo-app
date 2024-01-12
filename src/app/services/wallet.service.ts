import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProduct, CheckoutFormData } from '../interfaces/product';
import { wallet } from '../interfaces/wallet';
// import { UserStore } from '../@core/stores/user.store';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  apiUrl: string;
  private walletAddedSource = new Subject();
  walletAdded$ = this.walletAddedSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/wallets';
  }

  addWallet(data: wallet): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getWalletByUserId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-wallet-by-userId/${id}`);
  }
  widthraw(data: wallet): Observable<any> {
    return this.http.post(`${this.apiUrl}/withdraw`, data);
  }
  topUp(data: wallet): Observable<any> {
    return this.http.post(`${this.apiUrl}/top-up`, data);
  }
  buyProduct(data: CheckoutFormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/buy-ptoduct`, data);
  }

  updateWallet(id: string, data: AddProduct): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, data);
  }

  getWallet(id: string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  deleteWallet(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  getWallets(params = null): Observable<any> {
    let query = '';

    return this.http.get(this.apiUrl + '?' + query);
  }

  walletAdded(data: AddProduct | null) {
    this.walletAddedSource.next(data);
  }
}
