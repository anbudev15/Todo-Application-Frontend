import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo';
import { TodoService } from '../todos/services/todo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './completed.html',
  styleUrls: ['./completed.css']
})
export class CompletedComponent implements OnInit {
  completed: Todo[] = [];
  loading = false;
  error: string | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.todoService.getCompleted().subscribe({
      next: (data: Todo[]) => {
        this.completed = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load completed tasks';
        console.error(err);
        this.loading = false;
      }
    });
  }

  restore(task: Todo): void {
    if (!confirm('Restore this task to active list?')) return;
    this.todoService.restore(task.id!).subscribe({
      next: () => this.load(),
      error: (err: any) => { this.error = 'Failed to restore task'; console.error(err); }
    });
  }

  deletePermanent(task: Todo): void {
    if (!confirm('Permanently delete this task? This cannot be undone.')) return;
    this.todoService.hardDelete(task.id!).subscribe({
      next: () => this.load(),
      error: (err: any) => { this.error = 'Failed to delete permanently'; console.error(err); }
    });
  }
}
