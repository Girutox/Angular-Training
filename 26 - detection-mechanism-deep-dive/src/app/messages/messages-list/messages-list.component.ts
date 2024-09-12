import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent implements OnInit {
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);
  private messagesService = inject(MessagesService);
  // messages: string[] = [];
  messages$ = this.messagesService.message$;

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }

  ngOnInit(): void {
    // const subscription = this.messagesService.message$.subscribe(messages => {
    //   this.messages = messages;
    //   this.cdRef.markForCheck();
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }
}
