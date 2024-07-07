import { EventEmitter, Injectable, Output } from "@angular/core";
import { LoginService } from "./login.service";

@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loginService: LoginService) {}

  @Output() statusUpdated = new EventEmitter<string>();

  addAccount(newAccount: {name: string, status: string}) {
    this.accounts.push(newAccount);
    this.loginService.logStatus(newAccount.status);
  }

  updateAccount(id: number, newStatus: string) {
    this.accounts[id].status = newStatus;
    this.loginService.logStatus(newStatus);
  }
}