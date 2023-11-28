import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceplanService } from '../services/insuranceplan.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-insurance-plan-list',
  templateUrl: './insurance-plan-list.component.html',
  styleUrl: './insurance-plan-list.component.css'
})
export class InsurancePlanListComponent {
  plans: any;
  userRole:string=''
  constructor(private insurancePlanService: InsuranceplanService, private router: Router,private temporaryData:TemporaryDataService) 
  {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.fetchInsurancePlan();
  }

  fetchInsurancePlan(): void {
    this.insurancePlanService.getAllInsurancePlan().subscribe(
      {
        next:(data)=>{
        this.plans=data
        console.log(this.plans)
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  editInsurancePlan(planId: number): void {
    this.insurancePlanService.setId(planId)
    this.router.navigateByUrl(`/update-insurance-plan/${planId}`);
  }

  deleteInsurancePlan(planId: number): void {
    // Implement the logic to delete the agent using the agent service
    // For example:
    this.insurancePlanService.deleteInsurancePlan(planId).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchInsurancePlan();
      },
      error => {
        console.error('Error deleting Plan:', error);
      }
    );
  }
}