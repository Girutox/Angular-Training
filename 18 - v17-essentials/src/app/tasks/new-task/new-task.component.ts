import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask, Task } from '../../../model/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required: true}) userId!: string;
  @Output() dismiss = new EventEmitter<void>();
  title = "";
  summary = "";
  date = "";

  private taskService = inject(TaskService);

  onDismiss() {    
    this.dismiss.emit();
  }

  onSubmit() {
    this.taskService.addTask({
      title: this.title,
      summary: this.summary,
      dueDate: this.date
    }, this.userId);
    this.dismiss.emit();
  }
}
