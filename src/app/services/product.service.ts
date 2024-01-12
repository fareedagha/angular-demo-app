import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProduct } from '../interfaces/product';
// import { UserStore } from '../@core/stores/user.store';
import * as qs from 'qs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl: string;
  private productAddedSource = new Subject();
  productAdded$ = this.productAddedSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/products';
  }

  addProduct(data: AddProduct): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateProduct(id: string, data: AddProduct): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, data);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  getProducts(params: any): Observable<any> {
    let query = qs.stringify(params);
    return this.http.get(this.apiUrl + '?' + query);
  }

  productAdded(data: AddProduct | null) {
    this.productAddedSource.next(data);
  }
}
