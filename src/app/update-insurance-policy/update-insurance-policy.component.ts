// insurance-policy-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { InsurancePolicyService } from '../services/insurance-policy.service'; // Assuming you have an InsurancePolicyService
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-update-insurance-policy',
  templateUrl: './update-insurance-policy.component.html',
  styleUrls: ['./update-insurance-policy.component.css']
})
export class UpdateInsurancePolicyComponent implements OnInit {
  insurancePolicyForm!: FormGroup;
  policyNo: number = 0;
  userRole: string = '';

  constructor(
    private fb: FormBuilder,
    private insurancePolicyService: InsurancePolicyService, // Adjust this service based on your implementation
    private route: ActivatedRoute,
    private temporaryData: TemporaryDataService,
    private router: Router
  ) {
    this.userRole = temporaryData.getRole();
  }

  ngOnInit(): void {
    this.insurancePolicyForm = this.fb.group({
      policyNo: ['', Validators.required],
      issueDate: ['', Validators.required],
      maturityDate: ['', Validators.required],
      premiumType: ['', Validators.required],
      premiumAmount: [0, Validators.required],
      sumAssured: [0, Validators.required],
      status: ['', Validators.required],
      schemeId: [0, Validators.required],
      paymentId: [0, Validators.required],
      customerId: [0, Validators.required],
      // Additional fields as needed
    });

    // Extract the policy number from the route params
    this.route.params.subscribe(params => {
      const policyNo = +params['id'];
      // if (policyNoParam) {
        // const idParam = +params['id'];
        if (!isNaN(policyNo)) {
          this.policyNo=policyNo
          // Fetch policy details using the policy number
          this.fetchInsurancePolicyDetails(policyNo);
        } else {
          console.error('Invalid policy number parameter:', policyNo);
        }
      //  else {
      //   console.error('No policy number parameter provided');
      // }
    });
  }

  async updateInsurancePolicy(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      const requestBody = { ...this.insurancePolicyForm.value };
      const updatedPolicy = await lastValueFrom(this.insurancePolicyService.updateInsurancePolicy(requestBody));
      console.log('Insurance policy updated:', updatedPolicy);

      // Display an alert to the user
      alert('Insurance policy updated successfully!');
      this.router.navigateByUrl("/insurance-policy-list");

      // Optionally, you can reset the form or perform any other actions here
      // this.insurancePolicyForm.reset();
    } catch (error) {
      console.error('Error updating insurance policy:', error);

      // Display an error alert to the user
      alert('Error updating insurance policy. Please try again.');
    }
  }

  private fetchInsurancePolicyDetails(policyNo: number): void {
    this.insurancePolicyService.getInsurancePolicyById(policyNo).subscribe(
      (data) => {
        // Populate the form with policy details
        this.insurancePolicyForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching insurance policy details:', error);
      }
    );
  }
}