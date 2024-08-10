import { Component, Input, signal } from '@angular/core';
import { User } from '../../model/user';
import { TaskComponent } from "./task/task.component";
import { DUMMY_TASKS } from '../../model/dummy-tasks';
import { NewTaskComponent } from "./new-task/new-task.component";
import { NewTask } from '../../model/task';

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

  get selectedUserTasks() {
    return this.tasks.filter(a => a.userId == this.selectedUser.id);
  }

  onAddTask() {
    this.showAddTaskComponent.set(true);
  }

  onTaskCompleted(taskId: string) {
    this.tasks = this.tasks.filter(a => a.id != taskId);
  }

  onDismiss() {
    this.showAddTaskComponent.set(false);
  }

  onAdd(newTask: NewTask) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: this.selectedUser.id,
      title: newTask.title,
      summary: newTask.summary,
      dueDate: newTask.dueDate
    })
    this.showAddTaskComponent.set(false);
  }
}
