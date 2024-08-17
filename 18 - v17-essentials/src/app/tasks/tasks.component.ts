import { Component, Input, signal } from '@angular/core';
import { User } from '../../model/user';
import { TaskComponent } from "./task/task.component";
import { DUMMY_TASKS } from '../../model/dummy-tasks';
import { NewTaskComponent } from "./new-task/new-task.component";
import { NewTask } from '../../model/task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({ required: true }) selectedUser!: User;
  tasks = [...DUMMY_TASKS];
  showAddTaskComponent = signal(false);

  constructor(private taskService: TaskService) {}

  get selectedUserTasks() {
    return this.taskService.getTasksByUser(this.selectedUser.id);
  }

  onAddTask() {
    this.showAddTaskComponent.set(true);
  }

  onDismiss() {
    this.showAddTaskComponent.set(false);
  }
}
