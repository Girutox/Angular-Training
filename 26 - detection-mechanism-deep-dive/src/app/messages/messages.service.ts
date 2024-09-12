import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // private messages = signal<string[]>([]);
  // allMessages = this.messages.asReadonly();
  message$ = new BehaviorSubject<string[]>([]);
  private messages: string[] = [];
  get allMessages() {
    return this.messages;
  }

  addMessage(message: string) {
    this.messages = [...this.messages, message];
    this.message$.next([...this.messages]);
  }
}