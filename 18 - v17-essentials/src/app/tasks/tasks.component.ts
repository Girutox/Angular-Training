import { Component, Input } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({ required: true }) selectedUser!: User;
}
