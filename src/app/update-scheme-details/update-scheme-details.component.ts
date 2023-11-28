// update-scheme-details.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { SchemedetailsService } from '../services/schemedetails.service';
import { TemporaryDataService } from '../services/temporary-data.service';
@Component({
  selector: 'app-update-scheme-details',
  templateUrl: './update-scheme-details.component.html',
  styleUrls: ['./update-scheme-details.component.css']
})
export class UpdateSchemeDetailsComponent implements OnInit {
  schemeDetailsForm!: FormGroup;
  detailsId: number = 0;
  userRole:string=''

  constructor(
    private fb: FormBuilder,
    private schemeDetailsService: SchemedetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private temporaryData:TemporaryDataService
  ) {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.schemeDetailsForm = this.fb.group({
      detailId: ['', Validators.required],
      schemeImage: ['', Validators.required],
      description: ['', Validators.required],
      minAmount: [0, Validators.min(0)],
      maxAmount: [0, Validators.min(0)],
      minInvestmentTime: [0, Validators.min(0)],
      maxInvestmentTime: [0, Validators.min(0)],
      minAge: [0, Validators.min(0)],
      maxAge: [0, Validators.min(0)],
      profitRatio: [0, Validators.min(0)],
      registrationCommRatio: [0, Validators.min(0)],
      installmentCommRatio: [0, Validators.min(0)],
      // isActive: [false, Validators.required],
      schemeId: ['', Validators.required],
    });

    // Extract the scheme details ID from the route params
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        const id = +idParam;
        if (!isNaN(id)) {
          // Fetch scheme details using the ID
          this.fetchSchemeDetails(id);
        } else {
          console.error('Invalid scheme details ID parameter:', idParam);
        }
      } else {
        console.error('No scheme details ID parameter provided');
      }
    });
  }

  async updateSchemeDetails(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      const requestBody = { ...this.schemeDetailsForm.value };
      const updatedSchemeDetails = await lastValueFrom(this.schemeDetailsService.updateSchemeDetails(requestBody));
      console.log('Scheme details updated:', updatedSchemeDetails);

      // Display an alert to the user
      alert('Scheme details updated successfully!');
      this.router.navigateByUrl("/schemedetails-list")

      // Optionally, you can reset the form or perform any other actions here
      this.schemeDetailsForm.reset();
    } catch (error) {
      console.error('Error updating scheme details:', error);

      // Display an error alert to the user
      alert('Error updating scheme details. Please try again.');
    }
  }

  private fetchSchemeDetails(id: number): void {
    this.schemeDetailsService.getSchemeDetailsById(id).subscribe(
      (data) => {
        // Populate the form with scheme details
        this.schemeDetailsForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching scheme details:', error);
      }
    );
  }
}