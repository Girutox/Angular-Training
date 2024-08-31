import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentsService } from '../services/investments.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  investmentsService = inject(InvestmentsService);
  initialInvestment = 0;
  annualInvestment = 0;
  expectedReturn = 5;
  duration = 10;

  onSubmit() {
    this.investmentsService.calculateInvestmentResults({
      initialInvestment: this.initialInvestment,
      annualInvestment: this.annualInvestment,
      expectedReturn: this.expectedReturn,
      duration: this.duration
    });

    this.initialInvestment = 0;
    this.annualInvestment = 0;
    this.expectedReturn = 5;
    this.duration = 10;
  }
}
