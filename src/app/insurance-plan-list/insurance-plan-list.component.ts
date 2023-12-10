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
  plans: Array<any>;
  page: number = 1;
  totalRecords:number=0;
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences;
  userRole:string=''
  constructor(private insurancePlanService: InsuranceplanService, private router: Router,private temporaryData:TemporaryDataService) 
  { this.plans = new Array<any>();
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

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
    this.fetchInsurancePlan();
  }

  fetchInsurancePlan(): void {
    this.insurancePlanService.getAllInsurancePlan().subscribe(
      {
        next:(data)=>{
        this.plans=data
        console.log(this.plans)
        this.totalRecords=data.length
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  addInsurancePlan(): void {
    this.router.navigateByUrl("/add-insurance-plan")
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
  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchInsurancePlan(); // Fetch data with the new items per page
  }
}