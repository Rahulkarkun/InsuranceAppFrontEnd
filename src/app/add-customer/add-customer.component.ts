// src/app/add-agent/add-agent.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { lastValueFrom } from 'rxjs';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Agent } from '../models/agent';
import { AgentService } from '../services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerForm!: FormGroup; // Note the non-null assertion operator here
  userRole:string='';
  agents:any;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private agentService: AgentService,
    private router:Router,
    private temporaryData:TemporaryDataService,
  ) { this.userRole=temporaryData.getRole()
    console.log(this.userRole)
    }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Admin' && role !== 'Agent') {
      alert('Please Login As Admin or Agent');
      this.router.navigateByUrl('/login');
    }
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      nominee: ['', Validators.required],
      nomineeRelation: ['', Validators.required],
        // userId: [0, Validators.required],
      userName:['', Validators.required],
      password:['', Validators.required],
      agentId: [0, Validators.required],
      // agent:['', Validators.required],
    });
    this.fetchAgents();
  }

  async addCustomer(): Promise<void> {
    try {
      if (this.customerForm.valid) {
        const addedCustomer = await lastValueFrom(this.customerService.addCustomer(this.customerForm.value));
        console.log('Customer added:', addedCustomer);
  
        // Display an alert to the user
        alert('Customer added successfully!');
  
        // Optionally, you can reset the form or perform any other actions here
        this.customerForm.reset();
      } else {
        alert('Please fill in all required fields before submitting.');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
  
      // Display an error alert to the user
      alert('Error adding customer. Please try again.');
    }
  }
  
  private async fetchAgents(): Promise<void> {
    this.agentService.getAllAgents().subscribe({
      next:(result)=>{
        this.agents=result
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
  }
}