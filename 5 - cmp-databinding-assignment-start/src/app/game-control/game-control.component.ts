import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {
  intervalRef;
  currentNumber = 0;
  @Output() getCurrentNumber = new EventEmitter<number>();

  onStartGame() {
    this.intervalRef = setInterval(() => {
      console.log('Game started!');
      this.currentNumber++;
      this.getCurrentNumber.emit(this.currentNumber);
    }, 1000);
  }

  onStopGame() {
    clearInterval(this.intervalRef);
    this.intervalRef = null;
  }
}
