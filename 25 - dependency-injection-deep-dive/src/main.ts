import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TaskService } from './app/tasks/task.service';
import { InjectionToken } from '@angular/core';

export const TaskServiceInjectionToken = new InjectionToken<TaskService>('test-task-service-token');

bootstrapApplication(AppComponent, {
  // providers: [TaskService]
  providers: [{ provide: TaskServiceInjectionToken, useClass: TaskService }]
}).catch((err) => console.error(err));

// bootstrapApplication(AppComponent).catch((err) => console.error(err));
