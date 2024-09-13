import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  interval$ = interval(1000);
  interval = toSignal(this.interval$, { initialValue: 0 });

  constructor() {
    // effect(() => {
    //   console.log(`The button was clicked ${this.clickCount()} times`);      
    // });
  }

  ngOnInit(): void {
    // const subscription = interval(1000).pipe(
    //   map(val => val * 2)
    // ).subscribe({
    //   next: (val) => console.log(val)      
    // });

    this.interval$.pipe(
      map(val => val * 2)
    ).subscribe({
      next: (val) => console.log(val)      
    });
    
    const subscription = this.clickCount$.subscribe(val => {
      console.log(`The button was clicked ${val} times`);
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(oldValue => oldValue + 1);
  }
}
