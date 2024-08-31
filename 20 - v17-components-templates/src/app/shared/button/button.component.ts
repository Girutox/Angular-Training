import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  // encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  // description = input.required<string>();
  // icon = input<string>();
}
