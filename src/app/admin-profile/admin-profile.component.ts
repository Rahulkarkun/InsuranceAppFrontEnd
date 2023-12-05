import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { AdminService } from '../services/admin.service';
import { DataService } from '../services/data.service';
import { lastValueFrom } from 'rxjs';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  adminForm!: FormGroup;
  customerId: number = 0;
  userRole: string = '';
  loginId: number = 0;
  adminData:any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private temporaryData: TemporaryDataService,
    private dataService: DataService,
    private adminService: AdminService
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
    this.adminForm = this.fb.group({
      adminId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userId: [0]
    });

    this.fetchAdminDetails()
    // Extract the customer ID from the route params
    
    // this.route.params.subscribe(params => {
    //   const idParam = this.adminData.AdminId;
    //   if (idParam) {
    //     const id = +idParam;
    //     if (!isNaN(id)) {
    //       console.log(id)
    //       this.fetchAdminDetails(id);
    //     } else {
    //       console.error('Invalid admin ID parameter:', idParam);
    //     }
    //   } else {
    //     console.error('No admin ID parameter provided');
    //   }
    // });
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

  async updateAdmin(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      // const requestBody = { ...this.adminForm.value};
      debugger
      const updatedAdmin = await lastValueFrom(this.adminService.updateAdmin(this.adminForm.value));
      console.log('Admin updated:', updatedAdmin);

      // Display an alert to the user
      alert('Admin updated successfully!');
      this.router.navigateByUrl('/admin-dashboard')

      // Optionally, you can reset the form or perform any other actions here
      // this.customerForm.reset();
    } catch (error) {
      console.error('Error updating admin:', error);

      // Display an error alert to the user
      alert('Error updating customer. Please try again.');
    }
  }

  private fetchAdminDetails(): void {
    debugger
    this.adminService.getByuserId(this.dataService.userId).subscribe(
      (data) => {
        // Populate the form with customer details
        this.adminForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching customer details:', error);
      }
    );
  }
}
