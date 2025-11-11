// src/app/todos/todos.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Todo } from '../models/todo';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './todos.html',
  styleUrls: ['./todos.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  form: FormGroup;
  editing: Todo | null = null;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.load();
  }

  // Load only active (non-completed and non-deleted) tasks
  load(): void {
    this.loading = true;
    this.error = null;
    this.todoService.getAll().subscribe({
      next: (data: Todo[]) => {
        // If backend returns everything, filter here. If backend already returns only active, assign directly.
        this.todos = data.filter(t => !t.completed && !(t as any).deleted);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load tasks';
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Create or update
  submit(): void {
    if (this.form.invalid) return;
    const payload: Partial<Todo> = {
      title: this.form.value.title,
      description: this.form.value.description,
      completed: this.editing ? this.editing.completed : false
    };

    if (this.editing?.id) {
      this.todoService.update(this.editing.id, payload).subscribe({
        next: () => { this.cancelEdit(); this.load(); },
        error: (err: any) => { this.error = 'Failed to update task'; console.error(err); }
      });
    } else {
      this.todoService.create(payload).subscribe({
        next: () => { this.form.reset(); this.load(); },
        error: (err: any) => { this.error = 'Failed to create task'; console.error(err); }
      });
    }
  }

  // Start editing
  edit(todo: Todo): void {
    this.editing = todo;
    this.form.patchValue({ title: todo.title, description: todo.description });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Cancel editing
  cancelEdit(): void {
    this.editing = null;
    this.form.reset();
  }

  // Mark completed (does NOT delete)
  markAsCompleted(todo: Todo): void {
    const updated: Partial<Todo> = { completed: true };
    this.todoService.update(todo.id!, updated).subscribe({
      next: () => {
        // remove from local list immediately for snappy UX
        this.todos = this.todos.filter(x => x.id !== todo.id);
      },
      error: (err: any) => { this.error = 'Failed to mark task as completed'; console.error(err); }
    });
  }

  // Toggle checkbox (also updates)
  toggleComplete(todo: Todo): void {
    const updated: Partial<Todo> = { completed: !todo.completed };
    this.todoService.update(todo.id!, updated).subscribe({
      next: () => { this.todos = this.todos.filter(x => x.id !== todo.id); },
      error: (err: any) => { this.error = 'Failed to update completion state'; console.error(err); }
    });
  }

  // Delete (soft delete endpoint)
  delete(todo: Todo): void {
    if (!confirm('Are you sure you want to delete this task?')) return;
    this.todoService.delete(todo.id!).subscribe({
      next: () => { this.todos = this.todos.filter(x => x.id !== todo.id); },
      error: (err: any) => { this.error = 'Failed to delete task'; console.error(err); }
    });
  }
}
