import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../services/claim.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrl: './claim-list.component.css'
})
export class ClaimListComponent {
  claims: any;
  userRole:string=''
  constructor(private claimService: ClaimService, private router: Router,private temporaryData:TemporaryDataService) 
  {this.userRole=temporaryData.getRole()
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
  editClaim(claimId:number): void {
    debugger
    this.claimService.setId(claimId)
    this.router.navigate(['/update-claim',claimId]);
    console.log(claimId);
  }

  deleteClaim(claimId: number): void {
    // Implement the logic to delete the agent using the agent service
    // For example:
    this.claimService.deleteClaim(claimId).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchClaims();
      },
      error => {
        console.error('Error deleting agent:', error);
      }
    );
  }
}
