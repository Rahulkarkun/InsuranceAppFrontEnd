import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemedetailsService } from '../services/schemedetails.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemporaryDataService } from '../services/temporary-data.service';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-scheme-details',
  templateUrl: './scheme-details.component.html',
  styleUrl: './scheme-details.component.css'
})
export class SchemeDetailsComponent {
  schemeDetails: any; // Adjust the type based on your actual data structure
  schemeDetailsForm!: FormGroup;
  userRole: string = '';
  schemeName: string = '';

  constructor(private route: ActivatedRoute,
    private schemeDetailsService: SchemedetailsService,
    private fb: FormBuilder,
    private temporaryData: TemporaryDataService,
    private router: Router,
    private insuranceSchemeService: InsuranceSchemeService
    ) {
      // this.schemeDetails = this.route.snapshot.paramMap.get('schemeDetails');
      console.log(this.schemeDetails)
      this.userRole = temporaryData.getRole();
    console.log(this.userRole)
    }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Admin' && role !== 'Customer') {
      alert('Please Login As Admin or Customer');
      this.router.navigateByUrl('/login');
    }
    this.schemeDetailsForm = this.fb.group({
      DetailId: [0,Validators.required],
      SchemeImage: ['', Validators.required],
      Description: ['', Validators.required],
      MinAmount: [0, Validators.required],
      MaxAmount: [0, Validators.required],
      MinInvestmentTime: [0, Validators.required],
      MaxInvestmentTime: [0, Validators.required],
      MinAge: [0, Validators.required],
      MaxAge: [0],
      ProfitRatio: [0],
      RegistrationCommRatio: [0],
      InstallmentCommRatio: [0],
      SchemeId: [0]
      // agentId: [0],
      // userId: [0]
    });
    // this.route.data.subscribe((data) => {
    //   this.schemeDetails = data['schemeDetails'];
    //   console.log(this.schemeDetails);
    //   this.fetchSchemeDetails();
    // });

    this.schemeDetails = history.state.schemeDetails;
    debugger
    if (this.schemeDetails) {
      console.log(this.schemeDetails)
      this.fetchSchemeDetails();
      this.getSchemeName();
    }
  }
  
  

  // private fetchSchemeDetails(): void {
    // this.schemeDetailsService.getSchemeDetailsById(this.schemeDetails.detailId).subscribe(
    //   (data) => {
    //     this.schemeDetailsForm.patchValue(data);
    //   },
    //   (error) => {
    //     console.error('Error fetching scheme details:', error);
    //   }
    // );
    // this.schemeDetailsForm.patchValue(this.schemeDetails);
  // }

  private fetchSchemeDetails(): void {

    const schemeDetailsFormValue = {
      DetailId: this.schemeDetails.detailId,
      SchemeImage: this.schemeDetails.schemeImage,
      Description: this.schemeDetails.description,
      MinAmount: this.schemeDetails.minAmount,
      MaxAmount: this.schemeDetails.maxAmount,
      MinInvestmentTime: this.schemeDetails.minInvestmentTime,
      MaxInvestmentTime: this.schemeDetails.maxInvestmentTime,
      MinAge: this.schemeDetails.minAge,
      MaxAge: this.schemeDetails.maxAge,
      ProfitRatio: this.schemeDetails.profitRatio,
      RegistrationCommRatio: this.schemeDetails.registrationCommRatio,
      InstallmentCommRatio: this.schemeDetails.installmentCommRatio,
      SchemeId: this.schemeDetails.schemeId,
    };
  
    this.schemeDetailsForm.patchValue(schemeDetailsFormValue);
  }

  async updateSchemeDetails(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      const requestBody = { ...this.schemeDetailsForm.value };
      const updatedSchemeDetails = await lastValueFrom(this.schemeDetailsService.updateSchemeDetails(requestBody));
      console.log('Scheme details updated:', updatedSchemeDetails);

      // Display an alert to the user
      alert('Scheme details updated successfully!');
      this.router.navigateByUrl("/insurance-scheme-list")

      // Optionally, you can reset the form or perform any other actions here
      this.schemeDetailsForm.reset();
    } catch (error) {
      console.error('Error updating scheme details:', error);

      // Display an error alert to the user
      alert('Error updating scheme details. Please try again.');
    }
  }

  async getSchemeName(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      // const requestBody = { ...this.schemeDeilsForm.value };
      debugger
      var schemeData = await lastValueFrom(this.insuranceSchemeService.getInsuranceSchemeById(this.schemeDetails.schemeId));
      console.log(schemeData)
      this.schemeName = schemeData.schemeName;

      console.log(this.schemeName)
      // Display an alert to the user
      // alert('Scheme details updated successfully!');
      // this.router.navigateByUrl("/insurance-scheme-list")

      // // Optionally, you can reset the form or perform any other actions here
      // this.schemeDetailsForm.reset();
    } catch (error) {
      console.error('Error updating scheme details:', error);

      // Display an error alert to the user
      alert('Error updating scheme details. Please try again.');
    }
  }
}
