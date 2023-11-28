// // agent-list.component.ts

// import { Component, OnInit } from '@angular/core';
// import { Agent } from '../models/agent';
// import { AgentService } from '../services/agent.service';
// import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
// import { TemporaryDataService } from '../services/temporary-data.service';

// @Component({
//   selector: 'app-agent-list',
//   templateUrl: './agent-list.component.html',
//   styleUrls: ['./agent-list.component.css']
// })
// export class AgentListComponent implements OnInit {
//   agents: any;
//   userRole:string=''
//   constructor(private agentService: AgentService, private router: Router,private temporaryData:TemporaryDataService) 
//   {this.userRole=temporaryData.getRole()
//     console.log(this.userRole)}

//   ngOnInit(): void {
//     this.fetchAgents();
//   }

//   fetchAgents(): void {
//     this.agentService.getAllAgents().subscribe(
//       {
//         next:(data)=>{
//         this.agents=data
//         console.log(this.agents)
//       },
//       error:(errorResponse:HttpErrorResponse)=>{
//         console.log(errorResponse); 
//       }
//     }
//     );
//   }

//   editAgent(agentId: number): void {
//     //debugger
//     // Navigate to the update agent page with the agent ID
//     this.router.navigate(['/update-agent', agentId]);
//   }

//   deleteAgent(agentId: number): void {
//     // Implement the logic to delete the agent using the agent service
//     // For example:
//     this.agentService.deleteAgent(agentId).subscribe(
//       () => {
//         // Update the agents list after successful deletion
//         this.fetchAgents();
//       },
//       error => {
//         console.error('Error deleting agent:', error);
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { AgentService } from '../services/agent.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent {
  agents: any;
  userRole:string='';

  constructor(private agentService: AgentService, private router: Router, private temporaryData: TemporaryDataService) {
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
  }

  ngOnInit(): void {
    this.fetchAgents();
  }

  fetchAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        this.agents = data;
        console.log(this.agents);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  editAgent(agentId: number): void {
    // Navigate to the update agent page with the agent ID
    this.router.navigate(['/update-agent', agentId]);
  }

  deleteAgent(agentId: number): void {
    this.agentService.deleteAgent(agentId).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchAgents();
      },
      error => {
        console.error('Error deleting agent:', error);
      }
    );
  }
}

