import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  // private interval?: NodeJS.Timeout;
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(this.currentStatus());    
    });
  }

  ngOnInit(): void {
    const interval = setInterval(() => {
      const rdm = Math.random();

      if (rdm < 0.5) {
        this.currentStatus.set('offline');
      } else if (rdm < 0.9) {
        this.currentStatus.set('unknown');
      } else {
        this.currentStatus.set('online');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }

  ngOnDestroy(): void {
    // clearInterval(this.interval);
  }
}
