import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrl: './employee-navbar.component.css'
})

export class EmployeeNavbarComponent {
  data: any;
  employeeId: number = 0;
  constructor(private router:Router,
    private temporarydata:TemporaryDataService,
    private dataService: DataService,
    private employeeService: EmployeeService){
  }

  ngOnInit(): void {
    // this.loginId = this.dataService.userId;
    debugger
    console.log(this.dataService.userId)
    this.employeeService.getByuserId(this.dataService.userId).subscribe(
      {
        next: (result) => {
          this.data = result;
          console.log(this.data.employeeId)
          // Move the navigation logic here, inside the callback
          this.employeeId = this.data.employeeId
          // console.log(this.data.AdminId)
          // this.router.navigate(['/admin-profile',result.AdminId]);
          // console.log(result.AdminId)
        },
        error: (error) => {
          console.error('Error fetching customer details:', error);
        }
      }
    );
  }

  setRole(){
    this.temporarydata.setRole('Employee')
    // console.log(this.temporarydata.getRole)
    
  }
  deleteToken(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }
}
