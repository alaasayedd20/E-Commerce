import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient=inject(HttpClient)

  cartNumber:WritableSignal<number> = signal(0)

  myHeaders:any = {token: localStorage.getItem('userToken')}

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      }
    )
  }

  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  deleteSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }

  updateProductQuantity(id:string, cnt:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
    "count": cnt
    }
  )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

  constructor() { }
}
