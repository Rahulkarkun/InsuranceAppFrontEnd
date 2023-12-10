import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaimService } from '../services/claim.service';
import { AgentService } from '../services/agent.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrl: './add-claim.component.css'
})
export class AddClaimComponent implements OnInit {
  claimForm!: FormGroup; // Note the non-null assertion operator here
  userRole:string='';
  CustomerId: number = 0;
  customerData: Array<any>;
  agents:any;
  constructor(
    private fb: FormBuilder,
    private claimService: ClaimService,
    private router:Router,
    private dataService: DataService,
    private customerService: CustomerService,
    private agentService: AgentService,
    private temporaryData:TemporaryDataService,
  ) {this.customerData = new Array<any>() 
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)
    }

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
    this.claimForm = this.fb.group({
      claimAmount: ['', Validators.required],
      bankAccountNumber: ['', Validators.required],
      bankIfscCode: ['', Validators.required],
      date: ['', Validators.required],
      status: ['Unapproved', Validators.required],
      policyNo: [0, Validators.required],
      customerId: [0, Validators.required],
      // nomineeRelation: ['', Validators.required],
      //   // userId: [0, Validators.required],
      // userName:['', Validators.required],
      // password:['', Validators.required],
      // agentId: [0, Validators.required],
      // agent:['', Validators.required],
    });
    this.customerService.getByuserId(this.dataService.userId).subscribe({
      next: (customerData) => {
        console.log('Customer data received:', customerData);
        this.CustomerId = customerData.customerId;
        console.log(this.CustomerId)
        this.claimForm.patchValue({
          customerId: this.CustomerId})
      },
      error: (error) => {
        console.error('Error fetching customer details:', error);
      }
    });
  }

  async addClaim(): Promise<void> {
    try {
      if (this.claimForm.valid) {
        const addedClaim = await lastValueFrom(this.claimService.addClaim(this.claimForm.value));
        console.log('Claim added:', addedClaim);
  
        // Display an alert to the user
        alert('Claim  added successfully!');
        this.router.navigateByUrl("/customer-dashboard")
      
  
        // Optionally, you can reset the form or perform any other actions here
        this.claimForm.reset();
      } else {
        alert('Please fill in all required fields before submitting.');
      }
    } catch (error) {
      console.error('Error adding Claim :', error);
  
      // Display an error alert to the user
      alert('Error adding Claim . Please try again.');
    }
  }
  
 
}
