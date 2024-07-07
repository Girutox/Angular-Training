import { Component, EventEmitter, Output } from '@angular/core';

import { LoginService } from '../services/login.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoginService]
})
export class NewAccountComponent {
  constructor(/*private loginService: LoginService,*/ private accountService: AccountService) {
    this.accountService.statusUpdated.subscribe((status: string) => {
      alert('New status: ' + status);
    });
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount({name: accountName, status: accountStatus});
    // this.loginService.logStatus(accountStatus);
    
  }
}
