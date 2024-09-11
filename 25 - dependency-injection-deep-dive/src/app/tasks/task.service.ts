import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({
//   providedIn: 'root'
// })
export class TaskService {
  private tasks = signal<Task[]>([]);
  private logginService = inject(LoggingService);
  allTasks = this.tasks.asReadonly();

  constructor() { }

  addTask(taskData: { title: string, description: string }) {
    const newTask: Task = {
      id: Math.random().toString(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN'
    }

    this.tasks.update((oldTasks) => [...oldTasks, newTask]);

    this.logginService.log(`Added task with title: ${taskData.title}`);
  }

  changeStatus(id: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map((task) => {
      if (task.id == id) {
        return {...task, status: newStatus}
      } else {
        return task;
      }
    }));

    this.logginService.log(`Changed task status to: ${newStatus} for id: ${id}`);
  }
}
