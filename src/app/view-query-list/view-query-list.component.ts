import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryService } from '../services/query.service';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-query-list',
  templateUrl: './view-query-list.component.html',
  styleUrl: './view-query-list.component.css'
})
export class ViewQueryListComponent {
  queries: Array<any>;
  page: number = 1;
  totalRecords:number=0
  userRole:string='';
  selectedItemsPerPage: number = 5; 

  constructor(private queryService: QueryService, private router: Router, private temporaryData: TemporaryDataService) {
    this.queries=new Array<any>()
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
  }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Employee') {
      alert('Please Login As Employee');
      this.router.navigateByUrl('/login');
    }
    this.fetchQueries();
  }

  fetchQueries(): void {
    this.queryService.getAllQueries().subscribe({
      next: (data) => {
        this.queries = data;
        console.log(this.queries);
        this.totalRecords=data.length
        // this.dataSource = new MatTableDataSource<any>(this.agents); // Add this line
        // this.setupPaginator();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  editQuery(queryId: number): void {
    // Navigate to the update agent page with the agent ID
    this.router.navigate(['/update-query', queryId]);
  }

  deleteQuery(queryId: number): void {
    this.queryService.deleteQuery(queryId).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchQueries();
      },
      error => {
        console.error('Error deleting query:', error);
      }
    );
  }

  addQuery(): void {
    this.router.navigateByUrl("/add-query")
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchQueries(); // Fetch data with the new items per page
  }

}
