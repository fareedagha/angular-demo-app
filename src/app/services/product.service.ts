import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
// import { UserStore } from '../@core/stores/user.store';

const qs = require('qs');

@Injectable({
  providedIn: 'root'
})
export class ChargesService {

//   apiUrl: string;
  private chargeAddedSource = new Subject();
  chargeAdded$ = this.chargeAddedSource.asObservable();

  constructor(
    private http: HttpClient,
    // private userStore: UserStore
  ) {
    // this.apiUrl = environment.apiUrl + '/charges';
  }

//   addCharge(data): Observable<any>{
//     return this.http.post(this.apiUrl, data)
//     .catch(this.errorHandler); 
//   }

//   updateCharge(id, data): Observable<any>{
//     return this.http.put(this.apiUrl + '/' + id, data)
//     .catch(this.errorHandler);
//   }

//   getCharge(id): Observable<any>{
//     return this.http.get(this.apiUrl + '/' + id)
//     .catch(this.errorHandler);
//   }

//   deleteCharge(id){
//     return this.http.delete(this.apiUrl + '/' + id)
//     .catch(this.errorHandler);
//   }

//   getCharges(params = null): Observable<any>{
//     let query = '';

//     params = {
//       ...params, 
//       agencyId: this.userStore.getUser().agencyId
//     };

//     if(params){
//       query = qs.stringify(params);
//     }
    
//     return this.http.get(this.apiUrl + '?' + query)
//     .catch(this.errorHandler);
//   }

//   errorHandler(errorRes: HttpErrorResponse){
//     return Observable.throw(errorRes.error || 'Server error');
//   }

//   chargeAdded(data){
//     this.chargeAddedSource.next(data);
//   }
}