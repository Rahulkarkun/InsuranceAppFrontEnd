import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-insurance-scheme-list',
  templateUrl: './insurance-scheme-list.component.html',
  styleUrl: './insurance-scheme-list.component.css'
})
export class InsuranceSchemeListComponent {
  schemes: any;
  userRole:string=''
  constructor(private insuranceSchemeService: InsuranceSchemeService, private router: Router,private temporaryData:TemporaryDataService) 
  {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.fetchInsuranceScheme();
  }

  fetchInsuranceScheme(): void {
    this.insuranceSchemeService.getAllInsuranceScheme().subscribe(
      {
        next:(data)=>{
        this.schemes=data
        console.log(this.schemes)
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
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
}
