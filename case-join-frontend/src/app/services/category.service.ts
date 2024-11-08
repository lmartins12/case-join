import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/v1/categories';
  private categoriesUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category).pipe(
      tap(() => {
        this.categoriesUpdated.next();
      })
    );
  }

  removeCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${categoryId}`).pipe(
      tap(() => {
        this.categoriesUpdated.next();
      })
    );
  }

  updateCategory(categoryId: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${categoryId}`, category).pipe(
      tap(() => {
        this.categoriesUpdated.next();
      })
    );
  }

  getCategoriesUpdatedListener(): Observable<void> {
    return this.categoriesUpdated.asObservable();
  }
}
