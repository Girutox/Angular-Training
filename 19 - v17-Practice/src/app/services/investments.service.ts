import { Injectable, Output } from '@angular/core';
import { Investment } from '../model/investment.model';
import { CalculationResult } from '../model/calculation-result.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {
  updatedCalculations = new Subject<CalculationResult[]>();

  constructor() { }

  calculateInvestmentResults(investment: Investment) {
    const { initialInvestment, duration, expectedReturn, annualInvestment } = investment;

    const annualData: CalculationResult[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest = investmentValue - annualInvestment * year - initialInvestment;

      annualData.push({
        year: year,
        investmentValue: investmentValue,
        interestEarnedInYear: interestEarnedInYear,
        // annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        investedCapital: initialInvestment + annualInvestment * year,
      });
    }    

    this.updatedCalculations.next(annualData);
  }
}
