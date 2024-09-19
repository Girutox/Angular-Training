import { Component, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // userId = input<string>('');
  userName = input<string>('');
  message = input<string>('');
  
  // userName = computed(() => {
  //   return this.usersService.users.find(user => user.id == this.userId())?.name;
  // });

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   console.log('Route static data: ' + this.message());
    
  //   this.activatedRoute.paramMap.subscribe({
  //     next: (params) => {
  //       const userId = params.get('userId');
  //       this.userName = this.usersService.users.find(user => user.id == userId)?.name ?? '';
  //     }
  //   });
  // }
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, router: RouterStateSnapshot) => {
  const userId = activatedRoute.paramMap.get('userId');
  return inject(UsersService).users.find(user => user.id == userId)?.name ?? '';
}

export const resolveTitle: ResolveFn<string> = (activatedRoute, router) => {
  return `${resolveUserName(activatedRoute, router)}'s tasks`;
}
