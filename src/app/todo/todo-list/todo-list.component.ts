import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable, BehaviorSubject, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>; 
  private showCompleted = false; 

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  toggleView() {
    this.showCompleted = !this.showCompleted;
    this.loadTodos();
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.loadTodos();
    });
  }

  private loadTodos() {
    this.todos$ = this.todoService.getTodos().pipe(
      map(todos =>
        todos.filter(todo => todo.completed === this.showCompleted)
      )
    );
  }
}
