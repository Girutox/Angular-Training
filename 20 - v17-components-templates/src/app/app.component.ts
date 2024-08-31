import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { ServerStatusComponent } from "./server-status/server-status.component";
import { TrafficComponent } from "./traffic/traffic.component";
import { SupportTicketsComponent } from "./support-tickets/support-tickets.component";
import { DashboardItemComponent } from "./dashboard/dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, ServerStatusComponent, TrafficComponent, SupportTicketsComponent, DashboardItemComponent],
})
export class AppComponent {
  
}
