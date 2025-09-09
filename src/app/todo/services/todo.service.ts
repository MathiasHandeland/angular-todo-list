import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.apiUrl);
  }

  public addTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(environment.apiUrl, { title: title, completed: false });
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo);
  }
}
