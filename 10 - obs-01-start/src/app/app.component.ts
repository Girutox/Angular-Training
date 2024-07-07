import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isUserActivated = false;
  userActivatedSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userActivatedSubscription = this.userService.userActivated.subscribe((isUserActivated: boolean) => {
      this.isUserActivated = isUserActivated;
    })
  }

  ngOnDestroy(): void {
    this.userActivatedSubscription.unsubscribe();
  }
}
