import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
url='https://fakestoreapi.com'
  constructor(private http:HttpClient) { }
  getAllProducts(limit='12' ,sort='desc',category?:string):Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
`${this.url}/products${category ? '/category/' + category :''}?sort=${sort}&limit=${limit}`
    )
  }
  getALLCategies():Observable<Array<string>>{
    return this.http.get<Array<string>>(
      `${this.url}/products/categories`
    )
  }
}
