import { Component, contentChild, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  // @HostBinding('class') classValue = 'control';
  // @HostListener('click') onClick() {
  //   console.log('Clicked!');
  // }

  label = input.required<string>();
  hostElement = inject(ElementRef);
  // hostElement!: ElementRef;

  // constructor(_hostElement: ElementRef) {
  //   this.hostElement = _hostElement;
  // }

  // constructor(private hostElement: ElementRef) { }

  input = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  onClick() {
    console.log(this.hostElement);
    console.log(this.input());
    
  }
}
