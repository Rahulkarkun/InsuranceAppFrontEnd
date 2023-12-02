import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { DataService } from '../services/data.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-profile',
  templateUrl: './agent-profile.component.html',
  styleUrls: ['./agent-profile.component.css']
})
export class AgentProfileComponent {
  agentForm!: FormGroup;
  userRole: string = '';
  agentId: number = 0;
  // agentData:any


  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private dataService: DataService,
    private temporaryData: TemporaryDataService,
    private router: Router,
  ) {
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
    // this.agentId = dataService.userId;
  }

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      agentId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userId: [0],
      commissionEarned: [0], // Assuming commissionEarned is a numeric field
      qualification: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo :['', Validators.required]
      // Add other fields as needed
    });

    this.fetchAgentDetails();
  }

  async updateAgent(): Promise<void> {
    try {
      const updatedAgent = await lastValueFrom(this.agentService.updateAgent(this.agentForm.value));
      console.log('Agent updated:', updatedAgent);

      // Display an alert to the user
      alert('Agent updated successfully!');
      this.router.navigateByUrl('/agent-dashboard')

    } catch (error) {
      console.error('Error updating agent:', error);

      // Display an error alert to the user
      alert('Error updating agent. Please try again.');
    }
  }

  private fetchAgentDetails(): void {
    this.agentService.getByUserId(this.dataService.userId).subscribe(
      (data) => {
        // Populate the form with agent details
        this.agentForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching agent details:', error);
      }
    );
  }
}