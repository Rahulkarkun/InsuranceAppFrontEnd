import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-update-scheme',
  templateUrl: './update-scheme.component.html',
  styleUrls: ['./update-scheme.component.css']
})
export class UpdateSchemeComponent implements OnInit {
  schemeForm!: FormGroup;
  schemeId: number = 0;
  userRole:string=''
  constructor(
    private fb: FormBuilder,
    private schemeService: InsuranceSchemeService,
    private route: ActivatedRoute,
    private router: Router,
    private temporaryData:TemporaryDataService
  ) {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.schemeForm = this.fb.group({
      schemeId: ['', Validators.required],
      schemeName: ['', Validators.required],
      // isActive: [false, Validators.required],
      planId: [0],
      // detailsName: ['', Validators.required],
      // detailsDescription: ['', Validators.required],
      // planId: ['', Validators.required],
      // planName: ['', Validators.required],
      // planCoverage: ['', Validators.required],
    });

    // Extract the scheme ID from the route params
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        const id = +idParam;
        if (!isNaN(id)) {
          // Fetch scheme details using the ID
          this.fetchSchemeDetails(id);
        } else {
          console.error('Invalid scheme ID parameter:', idParam);
        }
      } else {
        console.error('No scheme ID parameter provided');
      }
    });
  }

  async updateScheme(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      const requestBody = { ...this.schemeForm.value };
      const updatedScheme = await lastValueFrom(this.schemeService.updateInsuranceScheme(requestBody));
      console.log('Scheme updated:', updatedScheme);

      // Display an alert to the user
      alert('Insurance scheme updated successfully!');
      this.router.navigateByUrl("/insurance-scheme-list")

      // Optionally, you can reset the form or perform any other actions here
      this.schemeForm.reset();
    } catch (error) {
      console.error('Error updating insurance scheme:', error);

      // Display an error alert to the user
      alert('Error updating insurance scheme. Please try again.');
    }
  }

  private fetchSchemeDetails(id: number): void {
    this.schemeService.getInsuranceSchemeById(id).subscribe(
      (data) => {
        // Populate the form with scheme details
        this.schemeForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching scheme details:', error);
      }
    );
  }
}