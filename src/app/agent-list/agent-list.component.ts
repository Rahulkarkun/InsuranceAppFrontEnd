// import { Component,ViewChild } from '@angular/core';
// import { AgentService } from '../services/agent.service';
// import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
// import { TemporaryDataService } from '../services/temporary-data.service';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';


// @Component({
//   selector: 'app-agent-list',
//   templateUrl: './agent-list.component.html',
//   styleUrls: ['./agent-list.component.css']
// })
// export class AgentListComponent {
//   agents: Array<any>;
//   page: number = 1;
//   totalRecords:number=0
//   userRole:string='';
//   selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  // dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Initialize here
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // constructor(private agentService: AgentService, private router: Router, private temporaryData: TemporaryDataService) {
  //   this.agents=new Array<any>()
  //   this.userRole = temporaryData.getRole();
  //   console.log(this.userRole);
  // }

  // ngOnInit(): void {
  //   this.fetchAgents();
  // }

  // fetchAgents(): void {
  //   this.agentService.getAllAgents().subscribe({
  //     next: (data) => {
  //       this.agents = data;
  //       console.log(this.agents);
  //       this.totalRecords=data.length
         // this.dataSource = new MatTableDataSource<any>(this.agents); // Add this line
        // this.setupPaginator();
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       console.log(errorResponse);
  //     }
  //   });
  // }

  // editAgent(agentId: number): void {
    // Navigate to the update agent page with the agent ID
  //   this.router.navigate(['/update-agent', agentId]);
  // }

  // deleteAgent(agentId: number): void {
  //   this.agentService.deleteAgent(agentId).subscribe(
  //     () => {
        // Update the agents list after successful deletion
  //       this.fetchAgents();
  //     },
  //     error => {
  //       console.error('Error deleting agent:', error);
  //     }
  //   );
  // }

  // addAgent(): void {
  //   this.router.navigateByUrl("/add-agent")
  // }

  // onItemsPerPageChange(): void {
  //   this.page = 1; // Reset to the first page when items per page changes
  //   this.fetchAgents(); // Fetch data with the new items per page
  // }
  

//}

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
  agents: Array<any>;
  page: number = 1;
  totalRecords: number = 0;
  userRole: string = '';
  selectedItemsPerPage: number = 5;
  searchTerm: string = '';
  filteredAgents: Array<any>;

  constructor(
    private agentService: AgentService,
    private router: Router,
    private temporaryData: TemporaryDataService
  ) {
    this.agents = new Array<any>();
    this.filteredAgents = new Array<any>();
    this.userRole = temporaryData.getRole();
  }

  ngOnInit(): void {
    this.fetchAgents();
  }

  fetchAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        this.agents = data;
        this.totalRecords = data.length;
        this.onSearchChange(); // Filter agents based on the initial search term (if any)
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

  addAgent(): void {
    this.router.navigateByUrl('/add-agent');
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchAgents(); // Fetch data with the new items per page
  }

  onSearchChange(): void {
    this.page = 1;
    const searchTermLC = this.searchTerm.toLowerCase();
    this.filteredAgents = this.agents.filter((agent) =>
      agent.agentId.toString().includes(this.searchTerm) || // Search by AgentId
      agent.firstName.toLowerCase().includes(searchTermLC) // Search by FirstName
    );
  }
}


