import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemedetailsService } from '../services/schemedetails.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-schemedetails-list',
  templateUrl: './schemedetails-list.component.html',
  styleUrl: './schemedetails-list.component.css'
})
export class SchemedetailsListComponent {
  details: Array<any>;
  page: number = 1;
  totalRecords:number=0
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  constructor(private schemeDetailsService: SchemedetailsService, private router: Router,private temporaryData:TemporaryDataService) 
  { this.details=new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.fetchSchemeDetails();
  }

  fetchSchemeDetails(): void {
    this.schemeDetailsService.getAllSchemeDetails().subscribe(
      {
        next:(data)=>{
        this.details=data
        console.log(this.details)
        this.totalRecords=data.length
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  editSchemeDetails(detailId: number): void {
    // Navigate to the update agent page with the agent ID
    debugger
    this.router.navigate(['/update-scheme-details', detailId]);
  }

  deleteSchemeDetails(detailId: number): void {
    // Implement the logic to delete the agent using the agent service
    // For example:
    this.schemeDetailsService.deleteSchemeDetails(detailId).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchSchemeDetails();
      },
      error => {
        console.error('Error deleting agent:', error);
      }
    );
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchSchemeDetails(); // Fetch data with the new items per page
  }
}
