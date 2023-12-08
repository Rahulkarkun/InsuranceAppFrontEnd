import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryService } from '../services/query.service';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-query-filter-customer',
  templateUrl: './query-filter-customer.component.html',
  styleUrl: './query-filter-customer.component.css'
})
export class QueryFilterCustomerComponent {
  queries: Array<any>;
  customer: Array<any>;
  page: number = 1;
  totalRecords:number=0
  userRole:string='';
  selectedItemsPerPage: number = 5; 

  constructor(private queryService: QueryService, private router: Router, private temporaryData: TemporaryDataService,private customerService:CustomerService,private dataService:DataService) {
    this.queries=new Array<any>()
    this.customer=new Array<any>()
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
  }

  ngOnInit(): void {
    this.fetchQueries();
  }

  fetchQueries(): void {
    this.queryService.getAllQueries().subscribe({
      next: (data) => {
        this.queries = data;
        console.log(this.queries);
        this.totalRecords=data.length
        this.fetchCustomers()
        // this.dataSource = new MatTableDataSource<any>(this.agents); // Add this line
        // this.setupPaginator();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }
  fetchCustomers(): void {
    //debugger
    this.customerService.getAllCustomers().subscribe(
      {
        next:(data)=>{
        this.customer=data
        console.log(this.customer)
        this.totalRecords=data.length
        this.filterQueries();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }
  filterQueries(){
    //debugger
    var customer=this.customer.find((a: any) => a.userId === this.dataService.userId)
    //console.log(customer);
    if((this.dataService.roleName=="Customer")){
      this.queries=this.queries.filter(x=>x.customerId === customer.customerId)
      console.log(this.queries)
      //this.filterPayment()
    }
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
