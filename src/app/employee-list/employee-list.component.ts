import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: Array<any>;
  page: number = 1;
  totalRecords:number=0;
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  constructor(private employeeService: EmployeeService, private router: Router,private temporaryData:TemporaryDataService) 
  {this.employees=new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      {
        next:(data)=>{
        this.employees=data
        console.log(this.employees)
        this.totalRecords=data.length

      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  addEmployee(): void {
    this.router.navigateByUrl("/add-employee")
  }

  editEmployee(employeeId: number): void {
    // Navigate to the update agent page with the agent ID
    this.router.navigate(['/update-employee', employeeId]);
  }

  deleteEmployee(employeeId: number): void {
    // Implement the logic to delete the agent using the agent service
    // For example:
    debugger
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchEmployees();
      },
      error => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchEmployees(); // Fetch data with the new items per page
  }
}
