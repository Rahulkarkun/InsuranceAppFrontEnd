import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-insurance-policy-list',
  templateUrl: './insurance-policy-list.component.html',
  styleUrl: './insurance-policy-list.component.css'
})
export class InsurancePolicyListComponent {
  policies: any;
  userRole:string=''
  constructor(private insurancePolicyService: InsurancePolicyService, 
    private router: Router,private temporaryData:TemporaryDataService) 
  {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.fetchInsurancePolicies();
  }

  fetchInsurancePolicies(): void {
    this.insurancePolicyService.getAllInsurancePolicy().subscribe(
      {
        next:(data)=>{
        this.policies=data
        console.log(this.policies)
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  editInsurancePolicy(policyNo: number): void {
    // Navigate to the update agent page with the agent ID
    this.router.navigate(['/update-insurance-policy', policyNo]);
  }

  deleteInsurancePolicy(policyNo: number): void {
    // Implement the logic to delete the agent using the agent service
    // For example:
    this.insurancePolicyService.deleteInsurancePolicy(policyNo).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchInsurancePolicies();
      },
      error => {
        console.error('Error deleting Policy:', error);
      }
    );
  }
}
