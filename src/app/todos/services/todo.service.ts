// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Use full backend URL (or environment.apiUrl)
  private baseUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  getCompleted(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/completed`);
  }

  get(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`);
  }

  create(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo);
  }

  update(id: number, todo: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, todo);
  }

  // soft delete (if you implemented soft-delete on backend)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  hardDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/permanent`);
  }

  restore(id: number): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}/${id}/restore`, {});
  }
}
