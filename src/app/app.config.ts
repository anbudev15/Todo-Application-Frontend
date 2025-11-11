import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TodosComponent } from './todos/todos';
import { CompletedComponent } from './completed/completed';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: TodosComponent },
      { path: 'completed', component: CompletedComponent }
    ]),
    provideHttpClient(withFetch()),
    provideAnimations()
  ]
};
