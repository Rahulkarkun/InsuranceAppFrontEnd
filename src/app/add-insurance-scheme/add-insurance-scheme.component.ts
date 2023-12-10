import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { InsuranceplanService } from '../services/insuranceplan.service';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-insurance-scheme',
  templateUrl: './add-insurance-scheme.component.html',
  styleUrls: ['./add-insurance-scheme.component.css']
})
export class AddInsuranceSchemeComponent implements OnInit {
  insuranceSchemeForm!: FormGroup; // Note the non-null assertion operator here
  userRole: string = '';
  insurancePlanData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private insuranceSchemeService: InsuranceSchemeService,
    private temporaryData: TemporaryDataService,
    private insurancePlan: InsuranceplanService
  ) {
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
  
    insurancePlan.getAllInsurancePlan().subscribe({
      next: (result) => {
        this.insurancePlanData = result;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  ngOnInit(): void {
    var token=localStorage.getItem('token')
    
    var role = this.userRole
    if(token==null){
      alert('Please login')
      this.router.navigateByUrl('/login')
    }
    else if(role!='Admin'){
      alert('Please Login As Admin')
      this.router.navigateByUrl('/login')
    }
    this.insuranceSchemeForm = this.fb.group({
      insurancePlanId: ['', Validators.required],
      schemeName: ['', Validators.required],
      planId: ['',Validators.required]
    });
    
    // if (this.insuranceSchemeForm) {
    // // Subscribe to changes in the insurancePlanId form control
    //   this.insuranceSchemeForm.get('insurancePlanId').valueChanges.subscribe((selectedPlanId) => {
    //   // Update the value of planId based on the selected option
    //   this.insuranceSchemeForm.patchValue({ planId: selectedPlanId });
    //   });
    // }
  }

  async addInsuranceScheme(): Promise<void> {
    try {
      const addedInsuranceScheme = await lastValueFrom(this.insuranceSchemeService.addInsuranceScheme(this.insuranceSchemeForm.value));
      console.log('Insurance Scheme added:', addedInsuranceScheme);

      // Display an alert to the user
      alert('Insurance Scheme added successfully!');
      if (this.userRole == 'Admin') {
        this.router.navigateByUrl("/admin-dashboard");
      }
      if (this.userRole == 'Employee') {
        this.router.navigateByUrl("/employee");
      }

      // Optionally, you can reset the form or perform any other actions here
      this.insuranceSchemeForm.reset();
    } catch (error) {
      console.error('Error adding InsuranceScheme:', error);

      // Display an error alert to the user
      alert('Error adding InsuranceScheme. Please try again.');
    }
  }
}
