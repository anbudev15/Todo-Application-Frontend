// src/app/app.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos';
import { CompletedComponent } from './completed/completed';

@Component({
  selector: 'app-root',
  standalone: true,
  // Import RouterModule so routerLink, routerLinkActive and <router-outlet> are available.
  // Also import any components you want to reference via routing if using them directly in templates.
  imports: [RouterModule, TodosComponent, CompletedComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
