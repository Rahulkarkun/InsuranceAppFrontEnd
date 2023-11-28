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
  employees: any;
  userRole:string=''
  constructor(private employeeService: EmployeeService, private router: Router,private temporaryData:TemporaryDataService) 
  {this.userRole=temporaryData.getRole()
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
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
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
}
