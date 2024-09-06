import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from '../model/ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './support-tickets.component.html',
  styleUrl: './support-tickets.component.css'
})
export class SupportTicketsComponent {
  tickets: Ticket[] = [];

  onAddTicket(ticket: Ticket) {
    this.tickets.push({
      id: Math.floor(Math.random() + 50),
      title: ticket.title,
      request: ticket.request,
      status: 'open'
    })
  }

  onCloseTicket(id: number) {
    this.tickets = this.tickets.map(ticket => {
      if (ticket.id == id) {
        return { ...ticket, status: 'closed' }
      } else {
        return ticket;
      }
    });
  }
}
