import { Component, ElementRef, output, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { ControlComponent } from "../../shared/control/control.component";
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../model/ticket.model';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  add = output<Ticket>();

  onSubmit(title: string, request: string) {
    this.add.emit({title, request} as Ticket);

    this.form().nativeElement.reset();
  }
}
