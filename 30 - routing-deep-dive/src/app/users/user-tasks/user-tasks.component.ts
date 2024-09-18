import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  // userId = input<string>('');
  userName = '';
  
  // userName = computed(() => {
  //   return this.usersService.users.find(user => user.id == this.userId())?.name;
  // });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const userId = params.get('userId');
        this.userName = this.usersService.users.find(user => user.id == userId)?.name ?? '';
      }
    });
  }
}
