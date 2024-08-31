import { Component } from "@angular/core";
import { ButtonComponent } from "../shared/button/button.component";

@Component({
  selector: "app-selector",
  templateUrl: "./header.component.html",
  standalone: true,
  imports: [ButtonComponent],
  styleUrl: "./header.component.css"
})
export class HeaderComponent {

}