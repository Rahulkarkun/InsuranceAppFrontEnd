import { Component,ViewChild } from '@angular/core';
import { AgentService } from '../services/agent.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent {
  agents: Array<any>;
  page: number = 1;
  totalRecords:number=0
  userRole:string='';
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  // dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Initialize here
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private agentService: AgentService, private router: Router, private temporaryData: TemporaryDataService) {
    this.agents=new Array<any>()
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
  }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Admin' && role !== 'Employee') {
      alert('Please Login As Admin or Agent');
      this.router.navigateByUrl('/login');
    }
    this.fetchAgents();
  }

  fetchAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        this.agents = data;
        console.log(this.agents);
        this.totalRecords=data.length
        // this.dataSource = new MatTableDataSource<any>(this.agents); // Add this line
        // this.setupPaginator();
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
    this.router.navigateByUrl("/add-agent")
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchAgents(); // Fetch data with the new items per page
  }
  // setupPaginator(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.paginator.pageSizeOptions = [5,10,20]; // Set your desired page size options
  //   // this.paginator.length = this.agents.length;
  //   // this.paginator.pageIndex = 0; // Reset to the first page
  //   this.paginator.pageSize = 5; // Set the initial page size
  //   this.paginator.showFirstLastButtons = true;
  //   // Attach the paginator to the data source
  //   // this.agents.paginator = this.paginator;
  // }
  
  // // Add a page event handler to handle page changes
  // onPageChange(event: PageEvent): void {
  //   // You can perform additional actions here if needed
  //   console.log('Page event:', event);
  // }

}

