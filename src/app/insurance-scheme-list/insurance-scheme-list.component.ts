import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';
import { SchemedetailsService } from '../services/schemedetails.service';
import { InsuranceplanService } from '../services/insuranceplan.service';

@Component({
  selector: 'app-insurance-scheme-list',
  templateUrl: './insurance-scheme-list.component.html',
  styleUrl: './insurance-scheme-list.component.css'
})
export class InsuranceSchemeListComponent {
  schemes: Array<any>;
  page: number = 1;
  totalRecords:number=0
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  insurancePlan: Array<any>;
  constructor(
    private insuranceSchemeService: InsuranceSchemeService, 
    private router: Router,
    private temporaryData:TemporaryDataService,
    private schemeDetails: SchemedetailsService,
    private insurancePlanService: InsuranceplanService) 
  { this.schemes=new Array<any>()
    this.insurancePlan = new Array<any>();
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
    this.insurancePlanService.getAllInsurancePlan().subscribe({
      next:(response)=>{
        this.insurancePlan=response
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.fetchInsuranceScheme();
  }

  fetchInsuranceScheme(): void {
    this.insuranceSchemeService.getAllInsuranceScheme().subscribe(
      {
        next:(data)=>{
        this.schemes=data
        console.log(this.schemes)
        this.totalRecords=data.length
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  getInsurancePlanName(planId: number): string {
    if (this.insurancePlan) {
      const plan = this.insurancePlan.find((a: any) => a.planId === planId);
      console.log(plan);
      return plan!=null ? `${plan.planName}` : 'Customer Not Found';
    } else {
      return 'Customer Data Not Loaded';
    }
  }


  addInsuranceScheme(): void {
    this.router.navigateByUrl("/add-insurance-scheme")
  }

  editInsuranceScheme(schemeId: number): void {
    // Navigate to the update agent page with the agent ID
    debugger
    this.router.navigate(['/update-scheme', schemeId]);
  }

  deleteInsuranceScheme(schemeId: number): void {
    // Implement the logic to delete the agent using the agent service
    // For example:
    this.insuranceSchemeService.deleteInsuranceScheme(schemeId).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchInsuranceScheme();
      },
      error => {
        console.error('Error deleting Scheme:', error);
      }
    );
  }

  viewInsuranceDetails(schemeId: number): void {
    this.insuranceSchemeService.getDetailsBySchemeId(schemeId).subscribe(
      (details) => {
        // Update the agents list after successful deletion
        console.log(details)
        this.router.navigate(['/scheme-details'], { state: { schemeDetails: details } });
        // debugger
        // this.router.navigate(['/scheme-details'], { state: { schemeDetails: details } });
      },
      (error) => {
        console.error('Error fetching Scheme Details:', error);
      }
    );
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchInsuranceScheme(); // Fetch data with the new items per page
  }
}

