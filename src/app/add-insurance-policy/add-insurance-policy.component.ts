import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { lastValueFrom } from 'rxjs';
import { TemporaryDataService } from '../services/temporary-data.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-insurance-policy',
  templateUrl: './add-insurance-policy.component.html',
  styleUrl: './add-insurance-policy.component.css'
})
export class AddInsurancePolicyComponent {
  insurancePolicyForm!: FormGroup; // Note the non-null assertion operator here
  userRole:string=''
  modelIssueDate: NgbDateStruct | undefined;
  modelMaturityDate: NgbDateStruct | undefined;
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private insurancePolicyService: InsurancePolicyService,private temporaryData:TemporaryDataService
  ) {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.insurancePolicyForm = this.fb.group({
      issueDate: ['', Validators.required],
      maturityDate: ['', Validators.required],
      premiumType: ['', Validators.required],
      premiumAmount: [0, Validators.required],
      sumAssured: [0, Validators.required],
      status: ['', Validators.required],
      planId: [0, Validators.required],
      paymentId: [0, Validators.required],
      customerId: [0, Validators.required],
      
    });
  }

  async addInsurancePolicy(): Promise<void> {
    try {
      const addedInsurancePolicy = await lastValueFrom(this.insurancePolicyService.addInsurancePolicy(this.insurancePolicyForm.value));
      console.log('Customer added:', addedInsurancePolicy);

      // Display an alert to the user
      alert(' InsurancePolicy added successfully!');
      if(this.userRole=='Admin')
        this.router.navigateByUrl("/admin-dashboard")
      if(this.userRole=='Employee')
        this.router.navigateByUrl("/employee")

      // Optionally, you can reset the form or perform any other actions here
      this.insurancePolicyForm.reset();
    } catch (error) {
      console.error('Error adding Insurance Policy:', error);

      // Display an error alert to the user
      alert('Error adding Insurance Policy. Please try again.');
    }
  }
}
