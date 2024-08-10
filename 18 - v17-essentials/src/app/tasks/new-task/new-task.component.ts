import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask, Task } from '../../../model/task';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Output() dismiss = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTask>();
  title = "";
  summary = "";
  date = "";

  onDismiss() {    
    this.dismiss.emit();
  }

  onSubmit() {
    this.add.emit({
      title: this.title,
      summary: this.summary,
      dueDate: this.date
    })
  }
}
