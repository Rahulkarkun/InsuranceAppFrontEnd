import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { AdminService } from '../services/admin.service';
import { EmployeeService } from '../services/employee.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent {
  employeeForm!: FormGroup;
  customerId: number = 0;
  userRole: string = '';
  loginId: number = 0;
  employeeData:any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private temporaryData: TemporaryDataService,
    private dataService: DataService,
    private employeeService: EmployeeService
  ) {
    // console.log("UserId"+dataService.userId)
    this.userRole = temporaryData.getRole();
    console.log(this.userRole)
    // adminService.getByuserId(dataService.userId).subscribe(
    //   {
    //     next:(result) => {
    //       this.adminData = result
    //     }
    //   }
    // );
    
    // console.log(this.adminData)
    
  }

  ngOnInit(): void {
    var token=localStorage.getItem('token')
    
    var role = this.userRole
    if(token==null){
      alert('Please login')
      this.router.navigateByUrl('/login')
    }
    else if(role!='Employee'){
      alert('Please Login As Employee')
      this.router.navigateByUrl('/login')
    }
    this.employeeForm = this.fb.group({
      employeeId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      userId: [0]
    });

    this.fetchEmployeeDetails()
  }

  // async updateInsurancePlan(): Promise<void> {
  //   try {
  //     const updatedPlan = await lastValueFrom(
  //       this.insurancePlanService.updateInsurancePlan(this.insurancePlanForm.value)
  //     );
  //     console.log('Insurance Plan updated:', updatedPlan);

  //     // Display an alert to the user
  //     alert('Insurance Plan updated successfully!');
  //   } catch (error) {
  //     console.error('Error updating Insurance Plan:', error);

  //     // Display an error alert to the user
  //     alert('Error updating Insurance Plan. Please try again.');
  //   }
  // }

  async updateEmployee(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      // const requestBody = { ...this.adminForm.value};
      debugger
      const updatedEmployee = await lastValueFrom(this.employeeService.updateEmployee(this.employeeForm.value));
      console.log('Employee updated:', updatedEmployee);

      // Display an alert to the user
      alert('Employee updated successfully!');
      this.router.navigateByUrl('/employee-dashboard')


      // Optionally, you can reset the form or perform any other actions here
      // this.customerForm.reset();
    } catch (error) {
      console.error('Error updating admin:', error);

      // Display an error alert to the user
      alert('Error updating Employee. Please try again.');
    }
  }

  private fetchEmployeeDetails(): void {
    this.employeeService.getByuserId(this.dataService.userId).subscribe(
      (data) => {
        // Populate the form with customer details
        this.employeeForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching customer details:', error);
      }
    );
  }
}
