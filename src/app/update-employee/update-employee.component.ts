import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  employeeForm!: FormGroup; // Note the non-null assertion operator here
  employeeId: number = 0;
  userRole:string=''
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,private temporaryData:TemporaryDataService
  ) {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

    ngOnInit(): void {
      var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Admin') {
      alert('Please Login As Admin');
      this.router.navigateByUrl('/login');
    }
      this.initForm();
      this.route.params.subscribe(params => {
        const idParam = +params['id'];
        if (!isNaN(idParam)) {
          this.employeeId = idParam;
          this.fetchEmployeeDetails();
        } else {
          console.error('Invalid id parameter:', idParam);
          // Handle the case where 'id' is not a valid number
        }
      });
    }
  
    initForm(): void {
      this.employeeForm = this.fb.group({
        employeeId: [0, Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        mobileNo: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        salary: [0, Validators.required],
        userId: [0],
        userName:[''],
        password:[''],
      });
    }
  
    fetchEmployeeDetails(): void {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (data) => {
          // Update the form with the fetched plan details
          this.employeeForm.patchValue(data);
        },
        (error) => {
          console.error('Error fetching Plan details:', error);
        }
      );
    }
  
    async updateEmployee(): Promise<void> {
      try {
        const updatedEmployee = await lastValueFrom(
          this.employeeService.updateEmployee(this.employeeForm.value)
        );
        console.log('Employee updated:', updatedEmployee);
  
        // Display an alert to the user
        alert('Employee updated successfully!');
      } catch (error) {
        console.error('Error updating Employee:', error);
  
        // Display an error alert to the user
        alert('Error updating Employee. Please try again.');
      }
    }
  
}
