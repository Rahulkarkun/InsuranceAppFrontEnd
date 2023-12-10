// update-customer.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customerId: number = 0;
  userRole: string = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private temporaryData: TemporaryDataService,
    private router: Router
  ) {
    this.userRole = temporaryData.getRole();
  }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Admin' && role !== 'Agent') {
      alert('Please Login As Admin');
      this.router.navigateByUrl('/login');
    }
    this.customerForm = this.fb.group({
      customerId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      nominee: ['', Validators.required],
      nomineeRelation: ['', Validators.required],
      agentId: ['', Validators.required],
      userId: ['', Validators.required],
    });

    // Extract the customer ID from the route params
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        const id = +idParam;
        if (!isNaN(id)) {
          // Fetch customer details using the ID
          this.fetchCustomerDetails(id);
        } else {
          console.error('Invalid customer ID parameter:', idParam);
        }
      } else {
        console.error('No customer ID parameter provided');
      }
    });
  }

  async updateCustomer(): Promise<void> {
    try {
      // Ensure all form fields are correctly mapped to the API request body
      const requestBody = { ...this.customerForm.value, userName: '', password: '' };
      const updatedCustomer = await lastValueFrom(this.customerService.updateCustomer(requestBody));
      console.log('Customer updated:', updatedCustomer);

      // Display an alert to the user
      alert('Customer updated successfully!');
      this.router.navigateByUrl("/customer-list")

      // Optionally, you can reset the form or perform any other actions here
      this.customerForm.reset();
    } catch (error) {
      console.error('Error updating customer:', error);

      // Display an error alert to the user
      alert('Error updating customer. Please try again.');
    }
  }

  private fetchCustomerDetails(id: number): void {
    this.customerService.getCustomerById(id).subscribe(
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

