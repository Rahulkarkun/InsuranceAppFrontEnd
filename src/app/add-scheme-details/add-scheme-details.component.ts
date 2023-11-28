// src/app/add-scheme-details/add-scheme-details.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

// import { InsuranceplanService } from '../services/insuranceplan.service';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { SchemedetailsService } from '../services/schemedetails.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-scheme-details',
  templateUrl: './add-scheme-details.component.html',
  styleUrls: ['./add-scheme-details.component.css']
})
export class AddSchemeDetailsComponent implements OnInit {
  schemeDetailsForm!: FormGroup; // Note the non-null assertion operator here
  userRole: string = '';
  insuranceSchemeData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private insuranceSchemeService: InsuranceSchemeService,
    private schemeDetailsService: SchemedetailsService,
    private temporaryData: TemporaryDataService,
    // private insurancePlan: InsuranceplanService
  ) {
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
  
    insuranceSchemeService.getAllInsuranceScheme().subscribe({
      next: (result) => {
        this.insuranceSchemeData = result;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  ngOnInit(): void {
    this.schemeDetailsForm = this.fb.group({
      insuranceSchemeId: ['', Validators.required],
      SchemeImage: ['', Validators.required],
      Description: ['', Validators.required],
      MinAmount: [0, Validators.required],
      MaxAmount: [0, Validators.required],
      MinInvestmentTime: [0, Validators.required],
      MaxInvestmentTime: [0, Validators.required],
      MinAge: [0, Validators.required],
      MaxAge: [0, Validators.required],
      ProfitRatio: [0, Validators.required],
      RegistrationCommRatio: [0, Validators.required],
      InstallmentCommRatio: [0, Validators.required],
      schemeId: ['',Validators.required]
    });
  }

  async addSchemeDetails(): Promise<void> {
    try {
      const addedSchemeDetails = await lastValueFrom(this.schemeDetailsService.addSchemeDetails(this.schemeDetailsForm.value));
      console.log('Scheme Details added:', addedSchemeDetails);

      // Display an alert to the user
      alert('Scheme Details added successfully!');
      if (this.userRole == 'Admin') {
        this.router.navigateByUrl("/admin-dashboard");
      }
      if (this.userRole == 'Employee') {
        this.router.navigateByUrl("/employee");
      }

      // Optionally, you can reset the form or perform any other actions here
      this.schemeDetailsForm.reset();
    } catch (error) {
      console.error('Error adding Scheme Details:', error);

      // Display an error alert to the user
      alert('Error adding Scheme Details. Please try again.');
    }
  }
}
