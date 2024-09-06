import { Directive, ElementRef, inject, input } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
  queryParam = input('myApp', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective works!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const response = window.confirm('Do you want to leave the page?');

    if (response) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = `${address}?from=${this.queryParam()}`;
      return;
    }

    event.preventDefault();
  }
}