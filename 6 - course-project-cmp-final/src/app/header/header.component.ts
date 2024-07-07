import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() pageChanged = new EventEmitter<string>();
  isAuthenticated = false;
  authSubs: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSubs = this.authService.userChanged.subscribe(
      user => {
        this.isAuthenticated = user != null;
      }
    )
  }

  // onSelectPage(page: string) {
  //   this.pageChanged.emit(page);
  // }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fecthRecipes().subscribe();
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }
}
