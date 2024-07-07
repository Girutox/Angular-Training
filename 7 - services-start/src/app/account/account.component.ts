import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginService } from '../services/login.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoginService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(/*private loginService: LoginService,*/ private accountService: AccountService) {
    
  }

  onSetTo(status: string) {
    this.accountService.updateAccount(this.id, status);
    // this.loginService.logStatus(status);
    this.accountService.statusUpdated.emit(status);
  }
}
