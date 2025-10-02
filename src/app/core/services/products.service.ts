import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient);
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }

  getSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?category=${categoryId}`);
  }

  getProductsByBrand(brandId: string): Observable<any> {
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?brand=${brandId}`);
}




  constructor() { }
}
