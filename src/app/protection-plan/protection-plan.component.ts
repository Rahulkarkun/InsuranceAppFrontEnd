// protection-plan.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-protection-plan',
  templateUrl: './protection-plan.component.html',
  styleUrls: ['./protection-plan.component.css']
})
export class ProtectionPlanComponent {
  years!: number;
  investmentAmount!: number;
  months!: number;

  installmentAmount: number | null = null;
  interestAmount: number | null = null;
  totalAmount: number | null = null;

  calculateInterest(): void {
    // Implement your interest calculation logic here
    // For example, you can use the provided input values to perform calculations
    const years = this.years;
    const investmentAmount = this.investmentAmount;
    const months = this.months;

    // Replace the following with your actual interest calculation logic
    // These are just placeholders
    this.installmentAmount = investmentAmount / (years * 12);
    this.interestAmount = 0.05 * investmentAmount; // 5% interest as a placeholder
    this.totalAmount = investmentAmount + this.interestAmount;
  }
}
