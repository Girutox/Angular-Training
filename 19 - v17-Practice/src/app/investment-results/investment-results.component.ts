import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CalculationResult } from '../model/calculation-result.model';
import { CommonModule } from '@angular/common';
import { InvestmentsService } from '../services/investments.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent implements OnInit, OnDestroy {
  investmentsService = inject(InvestmentsService);
  calculationsResult: CalculationResult[] = [];
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.investmentsService.updatedCalculations.subscribe(
      response => {
        this.calculationsResult = response;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
