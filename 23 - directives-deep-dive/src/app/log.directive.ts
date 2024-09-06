import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()'
  }
})
export class LogDirective {
  private hostElementRef = inject(ElementRef);

  constructor() { }

  onLog() {
    console.log('CLICKED!', this.hostElementRef.nativeElement);
  }
}
