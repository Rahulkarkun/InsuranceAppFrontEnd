import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-insurance-account',
  templateUrl: './insurance-account.component.html',
  styleUrl: './insurance-account.component.css'
})
export class InsuranceAccountComponent {
  account!: FormGroup
  userRole: string = '';
  constructor(
  private fb: FormBuilder,
  private temporaryData: TemporaryDataService,
  ){this.userRole = temporaryData.getRole();
    console.log(this.userRole)}


  ngOnInit(): void {
    this.account = this.fb.group({
      insuranceCreationDate: ['', Validators.required],
      maturityDate: ['', Validators.required],
      policyTerm: ['', Validators.required],
      totalPremium: ['', Validators.required],
      profitRatio: ['', Validators.required,],
      sumAssured: ['', Validators.required],
    })
  }
}


