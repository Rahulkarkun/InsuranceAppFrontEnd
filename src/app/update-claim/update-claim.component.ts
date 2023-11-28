// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-update-claim',
//   templateUrl: './update-claim.component.html',
//   styleUrl: './update-claim.component.css'
// })
// export class UpdateClaimComponent {

// }
// update-claim.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ClaimService } from '../services/claim.service';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-update-claim',
  templateUrl: './update-claim.component.html',
  styleUrls: ['./update-claim.component.css']
})
export class UpdateClaimComponent implements OnInit {
  claimForm!: FormGroup;
  claimId: number = 0;
  userRole:string=''
  constructor(
    private fb: FormBuilder,
    private claimService: ClaimService,
    private route: ActivatedRoute,private temporaryData:TemporaryDataService
  ) {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  // ngOnInit(): void {
  //   this.claimForm = this.fb.group({
  //     claimId: ['', Validators.required],
  //     claimAmount: ['', Validators.required],
  //     bankAccountNumber: ['', Validators.required],
  //     bankIfscCode: ['', Validators.required],
  //     date: ['', Validators.required],
  //     status: ['', Validators.required],
  //     policyNo: ['', Validators.required]
  //   });

  //   // Extract the claim ID from the route params
  //   this.route.params.subscribe(params => {
  //     const idParam = params['id'];
  //     if (idParam) {
  //       const id = +idParam;
  //       if (!isNaN(id)) {
  //         // Fetch claim details using the ID
  //         this.claimId = idParam;
  //         this.fetchClaimDetails(id);
  //       } else {
  //         console.error('Invalid claim ID parameter:', idParam);
  //       }
  //     } else {
  //       console.error('No claim ID parameter provided');
  //     }
  //   });
  // }

  // async updateClaim(): Promise<void> {
  //   try {
  //     const updatedClaim = await lastValueFrom(this.claimService.updateClaim(this.claimForm.value));
  //     console.log('Claim updated:', updatedClaim);

  //     // Display an alert to the user
  //     alert('Claim updated successfully!');

  //     // Optionally, you can reset the form or perform any other actions here
  //     this.claimForm.reset();
  //   } catch (error) {
  //     console.error('Error updating claim:', error);

  //     // Display an error alert to the user
  //     alert('Error updating claim. Please try again.');
  //   }
  // }

  // private fetchClaimDetails(id: number): void {
  //   this.claimService.getClaimById(id).subscribe(
  //     (data) => {
  //       // Populate the form with claim details
  //       this.claimForm.patchValue(data);
  //     },
  //     (error) => {
  //       console.error('Error fetching claim details:', error);
  //     }
  //   );
  // }
  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      const idParam = +params['id'];
      if (!isNaN(idParam)) {
        this.claimId = idParam;
        this.fetchClaimDetails();
      } else {
        console.error('Invalid id parameter:', idParam);
        // Handle the case where 'id' is not a valid number
      }
    });
  }

  initForm(): void {
    this.claimForm = this.fb.group({
      claimId: ['', Validators.required],
      claimAmount: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      bankIfscCode: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
      policyNo: ['', Validators.required]
    });
  }

  fetchClaimDetails(): void {
    this.claimService.getClaimById(this.claimId).subscribe(
      (data) => {
        // Update the form with the fetched plan details
        this.claimForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching Claim details:', error);
      }
    );
  }

  async updateClaim(): Promise<void> {
    try {
      const updatedClaim = await lastValueFrom(
        this.claimService.updateClaim(this.claimForm.value)
      );
      console.log('Claim updated:', updatedClaim);

      // Display an alert to the user
      alert('Claim updated successfully!');
    } catch (error) {
      console.error('Error updating Claim:', error);

      // Display an error alert to the user
      alert('Error updating Claim. Please try again.');
    }
  }
}