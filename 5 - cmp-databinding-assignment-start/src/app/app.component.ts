import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obtainedNumbers: number[] = [];

  onGetCurrentNumber(currentNumber: number) {
    this.obtainedNumbers.push(currentNumber);
    console.log(this.obtainedNumbers);
    
  }
}
