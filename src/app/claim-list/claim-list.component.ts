import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../services/claim.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Claim } from '../models/claim';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrl: './claim-list.component.css'
})
export class ClaimListComponent {
  claims: Array<any>;
  page: number = 1;
  totalRecords:number=0
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  constructor(private claimService: ClaimService, private router: Router,private temporaryData:TemporaryDataService) 
  { 
    this.claims=new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.fetchClaims();
  }

  fetchClaims(): void {
    this.claimService.getAllClaims().subscribe(
      {
        next:(data)=>{
        this.claims=data
        console.log(this.claims)
        this.totalRecords=data.length
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }
 
//   editClaim(claimId: number): void {
//     // Navigate to the update claim page with the claim ID
//     this.router.navigate(['/update-claim', claimId]);
// }
resolveClaim(claimId: number): void {
  this.claimService.getClaimById(claimId).subscribe(
    (claim: Claim) => {
      // Assuming 'IsActive' is a boolean property
      claim.Status = 'Approved';

      this.claimService.updateClaim(claim).subscribe(
        (updatedClaim) => {
          console.log('Claim approved successfully:', updatedClaim);
          this.fetchClaims();
        },
        (error) => {
          console.error('Error updating claim:', error);
        }
      );
    },
    (error) => {
      console.error('Error fetching claim:', error);
    }
  );
}

onItemsPerPageChange(): void {
  this.page = 1; // Reset to the first page when items per page changes
  this.fetchClaims(); // Fetch data with the new items per page
}

  // deleteClaim(claimId: number): void {
  //   // Implement the logic to delete the agent using the agent service
  //   // For example:
  //   this.claimService.deleteClaim(claimId).subscribe(
  //     () => {
  //       // Update the agents list after successful deletion
  //       this.fetchClaims();
  //     },
  //     error => {
  //       console.error('Error deleting agent:', error);
  //     }
  //   );
  // }
        }
