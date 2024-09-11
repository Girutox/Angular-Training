import { Component, computed, effect, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { Task, TaskStatusOptionsProvider, TaskStatusOptionsToken } from '../task.model';
import { TaskServiceInjectionToken } from '../../../main';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [TaskStatusOptionsProvider]
})
export class TasksListComponent {
  private taskService = inject(TaskServiceInjectionToken);
  taskStatusOptions = inject(TaskStatusOptionsToken);

  private selectedFilter = signal<string>('all');
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.taskService.allTasks().filter(a => a.status == 'OPEN');
      case 'in-progress':
        return this.taskService.allTasks().filter(a => a.status == 'IN_PROGRESS');
      case 'done':
        return this.taskService.allTasks().filter(a => a.status == 'DONE');
      default:
        return this.taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
