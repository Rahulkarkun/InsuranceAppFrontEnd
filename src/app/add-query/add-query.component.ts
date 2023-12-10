import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryService } from '../services/query.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { lastValueFrom } from 'rxjs';
import { CustomerService } from '../services/customer.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-query',
  templateUrl: './add-query.component.html',
  styleUrl: './add-query.component.css'
})
export class AddQueryComponent implements OnInit {
  queryForm!: FormGroup; // Note the non-null assertion operator here
  userRole:string=''
  CustomerId: number = 0;
  customerData: Array<any>;
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private dataService: DataService,
    private customerService: CustomerService,
    private queryService: QueryService,private temporaryData:TemporaryDataService
  ) {this.customerData = new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

    
  ngOnInit(): void {
    var token=localStorage.getItem('token')
    
    var role = this.userRole
    if(token==null){
      alert('Please login')
      this.router.navigateByUrl('/login')
    }
    else if(role!='Customer'){
      alert('Please Login As Customer')
      this.router.navigateByUrl('/login')
    }
    
    this.queryForm = this.fb.group({
      queryTitle : ['',Validators.required],
      queryMessage : ['',Validators.required],
      queryDate : ['',Validators.required],
      reply : [''],
      customerId : [null],
    });
    this.customerService.getByuserId(this.dataService.userId).subscribe({
      next: (customerData) => {
        console.log('Customer data received:', customerData);
        this.CustomerId = customerData.customerId;
        console.log(this.CustomerId)
        this.queryForm.patchValue({
          customerId: this.CustomerId})
      },
      error: (error) => {
        console.error('Error fetching customer details:', error);
      }
    });
    
  }

  async addQuery(): Promise<void> {
    try {
      const addedQuery = await lastValueFrom(this.queryService.addQuery(this.queryForm.value));
      console.log('Query added:', addedQuery);

      // Display an alert to the user
      alert('Query added successfully!');
        this.router.navigateByUrl("/customer-dashboard")
      // Optionally, you can reset the form or perform any other actions here
      this.queryForm.reset();
    } catch (error) {
      console.error('Error adding query:', error);

      // Display an error alert to the user
      alert('Error adding query. Please try again.');
    }
  }
}
