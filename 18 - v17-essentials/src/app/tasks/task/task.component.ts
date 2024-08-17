import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Task } from '../../../model/task';
import { CardComponent } from "../../shared/card/card.component";
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({required: true}) task!: Task;
  taskService = inject(TaskService);

  onCompleteTask() {
    this.taskService.completeTask(this.task.id);
  }
}
