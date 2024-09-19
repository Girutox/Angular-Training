import { Component, computed, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  userId = input<string>('');
  // order = input<'asc' | 'desc'>();
  // order?: 'asc' | 'desc';
  order = signal<'asc' | 'desc'>('desc');
  userTasks = computed(() =>
    this.tasksService.allTasks().filter(task => task.userId == this.userId()).sort((a, b) => {
      if (this.order() === 'asc') {
        return a.dueDate > b.dueDate ? 1 : -1;
      } else {
        return a.dueDate < b.dueDate ? 1 : -1;
      }
    })
  );

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: params => {
        this.order.set(params['order']);
      }
    });
  }
}
