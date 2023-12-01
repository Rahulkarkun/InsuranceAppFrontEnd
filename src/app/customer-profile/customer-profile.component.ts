import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {
  customerForm!: FormGroup;
  customerId: number = 0;
  userRole: string = '';
  loginId: number = 0;
  customerData:any
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router:Router,
    private temporaryData: TemporaryDataService,
    private dataService: DataService,
  ) {this.userRole = temporaryData.getRole();
    console.log(this.userRole)
  }
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      nominee: [''],
      nomineeRelation: [''],
      insurancePolicies: [''],
      document: [''],
      agentId: [0],
      userId: [0]
    });

    this.fetchCustomerDetails()
  }
  async updateCustomer(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      // const requestBody = { ...this.adminForm.value};
      debugger
      const updatedCustomer = await lastValueFrom(this.customerService.updateCustomer(this.customerForm.value));
      console.log('Customer updated:', updatedCustomer);

      // Display an alert to the user
      alert('Customer updated successfully!');
      this.router.navigateByUrl("/customer-dashboard")

      // Optionally, you can reset the form or perform any other actions here
      // this.customerForm.reset();
    } catch (error) {
      console.error('Error updating customer:', error);

      // Display an error alert to the user
      alert('Error updating customer. Please try again.');
    }
  }

  private fetchCustomerDetails(): void {
    this.customerService.getByuserId(this.dataService.userId).subscribe(
      (data) => {
        // Populate the form with customer details
        this.customerForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching customer details:', error);
      }
    );
  }
}
