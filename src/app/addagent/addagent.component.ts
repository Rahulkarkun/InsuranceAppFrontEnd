// src/app/add-agent/add-agent.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { Agent } from '../models/agent';
import { lastValueFrom } from 'rxjs';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addagent',
  templateUrl: './addagent.component.html',
  styleUrls: ['./addagent.component.css']
})
export class AddagentComponent implements OnInit {
  agentForm!: FormGroup;
  userRole:string=''
  constructor(private fb: FormBuilder,
    private router:Router, 
    private agentService: AgentService,
    private temporaryData:TemporaryDataService) 
  {this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      qualification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      // userId: [0],
      userName:['', Validators.required],
      password:['', Validators.required],
      commissionEarned: [0, Validators.required],
      // isActive: [true], // Uncomment this line if needed
    });
  }

  async addAgent(): Promise<void> {
    try {
      const addedAgent = await lastValueFrom(this.agentService.addAgent(this.agentForm.value));
      console.log('Agent added:', addedAgent);

      // Display an alert to the user
      alert('Agent added successfully!');
      if(this.userRole=='Admin')
        this.router.navigateByUrl("/admin-dashboard")
      if(this.userRole=='Employee')
        this.router.navigateByUrl("/employee")

      // Optionally, you can reset the form or perform any other actions here
      this.agentForm.reset();
    } catch (error) {
      console.error('Error adding agent:', error);

      // Display an error alert to the user
      alert('Error adding agent. Please try again.');
    }
  }
}