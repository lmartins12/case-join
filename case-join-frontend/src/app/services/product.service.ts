import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  removeProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }

  updateProduct(productId: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, product);
  }
}
