import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaimService } from '../services/claim.service';
import { AgentService } from '../services/agent.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrl: './add-claim.component.css'
})
export class AddClaimComponent implements OnInit {
  claimForm!: FormGroup; // Note the non-null assertion operator here
  userRole:string='';
  agents:any;
  constructor(
    private fb: FormBuilder,
    private claimService: ClaimService,
    private router:Router,
    private agentService: AgentService,
    private temporaryData:TemporaryDataService,
  ) { this.userRole=temporaryData.getRole()
    console.log(this.userRole)
    }

  ngOnInit(): void {
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
