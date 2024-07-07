import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  // userActivated = new EventEmitter<boolean>();
  userActivated = new Subject<boolean>();
}