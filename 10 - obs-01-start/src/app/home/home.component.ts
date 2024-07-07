import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observer, Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  countSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.countSubscription = interval(1000).subscribe((count: number) => {
    //   console.log(count);
    // })

    const customIntervalObservable = Observable.create((observer: Observer<any>) => {
      let count = 0;

      setInterval(() => {
        observer.next(count++);

        if (count == 3) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error("Something went wrong!"));
        }
      }, 1000);
    });

    this.countSubscription = customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    }), map((data: number) => {
      return `Round: ${data + 1}`;
    })).subscribe((response: string) => {
      console.log(response);      
    }, (error) => {
      console.log(error);      
    }, () => {
      console.log('Completed!!');
      
    })
  }

  ngOnDestroy(): void {
    this.countSubscription.unsubscribe();
  }
}
