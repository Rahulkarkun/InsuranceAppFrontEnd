import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { InsuranceplanService } from '../services/insuranceplan.service';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-update-insurance-plan',
  templateUrl: './update-insurance-plan.component.html',
  styleUrls: ['./update-insurance-plan.component.css']
})
export class UpdateInsurancePlanComponent implements OnInit {
  insurancePlanForm!: FormGroup;
  planId: number = 0;
  userRole:string=''
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private insurancePlanService: InsuranceplanService,private temporaryData:TemporaryDataService
  ) {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Admin') {
      alert('Please Login As Admin');
      this.router.navigateByUrl('/login');
    }
    this.initForm();
    this.route.params.subscribe(params => {
      const idParam = +params['id'];
      if (!isNaN(idParam)) {
        this.planId = idParam;
        this.fetchInsurancePlanDetails();
      } else {
        console.error('Invalid id parameter:', idParam);
        // Handle the case where 'id' is not a valid number
      }
    });
  }

  initForm(): void {
    this.insurancePlanForm = this.fb.group({
      planId: ['', Validators.required],
      planName: ['', Validators.required],
      // Add other form controls as needed
    });
  }

  fetchInsurancePlanDetails(): void {
    this.insurancePlanService.getInsurancePlanById(this.planId).subscribe(
      (data) => {
        // Update the form with the fetched plan details
        this.insurancePlanForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching Plan details:', error);
      }
    );
  }

  async updateInsurancePlan(): Promise<void> {
    try {
      const updatedPlan = await lastValueFrom(
        this.insurancePlanService.updateInsurancePlan(this.insurancePlanForm.value)
      );
      console.log('Insurance Plan updated:', updatedPlan);

      // Display an alert to the user
      alert('Insurance Plan updated successfully!');
    } catch (error) {
      console.error('Error updating Insurance Plan:', error);

      // Display an error alert to the user
      alert('Error updating Insurance Plan. Please try again.');
    }
  }
}