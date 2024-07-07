import { Component } from '@angular/core';

type ClickLog = {
  id: number;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showParagraph = true;
  clickLog: ClickLog[] = [];

  onDisplay() {
    this.showParagraph = !this.showParagraph;
    this.clickLog.push({
      id: this.clickLog.length + 1,
      timestamp: new Date()
    });
  }
}
