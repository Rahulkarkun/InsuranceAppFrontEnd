// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CustomerService } from '../services/customer.service';
// import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
// import { TemporaryDataService } from '../services/temporary-data.service';
// import { AgentService } from '../services/agent.service';

// @Component({
//   selector: 'app-customer-list',
//   templateUrl: './customer-list.component.html',
//   styleUrl: './customer-list.component.css'
// })
// export class CustomerListComponent {
//   customers: Array<any>;
//   page: number = 1;
//   totalRecords:number=0
//   userRole:string=''
//   agentData: Array<any>;
  // selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
//   constructor(
//     private customerService: CustomerService, 
//     private router: Router,
//     private temporaryData:TemporaryDataService,
//     private agentService: AgentService) 
//   { 
//     this.agentData=new Array<any>()
//     this.customers=new Array<any>()
//     this.userRole=temporaryData.getRole()
//     console.log(this.userRole)}

//   ngOnInit(): void {
//     this.agentService.getAllAgents().subscribe({
//       next:(response)=>{
//         this.agentData=response
//       },
//       error(errorResponse:HttpErrorResponse){
//         console.log(errorResponse)
//       }
//     })
//     this.fetchCustomers();
//   }

//   fetchCustomers(): void {
//     // debugger
//     this.customerService.getAllCustomers().subscribe(
//       {
//         next:(data)=>{
//         this.customers=data
//         console.log(this.customers)
//         this.totalRecords=data.length
//       },
//       error:(errorResponse:HttpErrorResponse)=>{
//         console.log(errorResponse); 
//       }
//     }
//     );
//   }

//   addCustomer(): void {
//     this.router.navigateByUrl("/add-customer")
//   }

 
//  editCustomer(customerId: number): void {
//   if (!isNaN(customerId)) {
    // Navigate to the update customer page with the customer ID
  //   this.router.navigate(['/update-customer', customerId]);
  // } else {
  //   console.error('Invalid customer ID:', customerId);
    // Handle the case where customerId is not a valid number
//   }
// }


// deleteCustomer(customerId: number): void {
//   this.customerService.deleteCustomer(customerId).subscribe(
//     () => {
//       // Update the agents list after successful deletion
//       this.fetchCustomers();
//     },
//     error => {
//       console.error('Error deleting agent:', error);
//     }
//   );
// }

// getAgentName(agentId: number): string {
//   if (this.agentData) {
//     const agent = this.agentData.find((a: any) => a.agentId === agentId);
//     console.log(agent);
//     return agent!=null ? `${agent.firstName} ${agent.lastName}` : 'Customer Not Found';
//   } else {
//     return 'Customer Data Not Loaded';
//   }
// }

// onItemsPerPageChange(): void {
//   this.page = 1; // Reset to the first page when items per page changes
//   this.fetchCustomers(); // Fetch data with the new items per page
// }


//  }

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Array<any>;
  page: number = 1;
  totalRecords: number = 0;
  userRole: string = '';
  agentData: Array<any>;
  selectedItemsPerPage: number = 5;
  searchTerm: string = '';
  filteredCustomers: Array<any>;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private temporaryData: TemporaryDataService,
    private agentService: AgentService
  ) {
    this.agentData = new Array<any>();
    this.customers = new Array<any>();
    this.filteredCustomers = new Array<any>();
    this.userRole = temporaryData.getRole();
  }

  ngOnInit(): void {
    this.agentService.getAllAgents().subscribe({
      next: (response) => {
        this.agentData = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.totalRecords = data.length;
        this.onSearchChange(); // Filter customers based on the initial search term (if any)
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  addCustomer(): void {
    this.router.navigateByUrl('/add-customer');
  }

  editCustomer(customerId: number): void {
    if (!isNaN(customerId)) {
      this.router.navigate(['/update-customer', customerId]);
    } else {
      console.error('Invalid customer ID:', customerId);
    }
  }

  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe(
      () => {
        this.fetchCustomers();
      },
      error => {
        console.error('Error deleting customer:', error);
      }
    );
  }

  getAgentName(agentId: number): string {
    if (this.agentData) {
      const agent = this.agentData.find((a: any) => a.agentId === agentId);
      return agent != null ? `${agent.firstName} ${agent.lastName}` : 'Customer Not Found';
    } else {
      return 'Customer Data Not Loaded';
    }
  }

  onItemsPerPageChange(): void {
    this.page = 1;
    this.fetchCustomers();
  }

  onSearchChange(): void {
    this.page = 1;
    const searchTermLC = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) =>
      customer.customerId.toString().includes(this.searchTerm) || // Search by CustomerId
      customer.firstName.toLowerCase().includes(searchTermLC) || // Search by FirstName
      customer.state.toLowerCase().includes(searchTermLC) ||
      customer.city.toLowerCase().includes(searchTermLC) ||
      customer.nominee.toLowerCase().includes(searchTermLC) 
      
    );
  }
}
