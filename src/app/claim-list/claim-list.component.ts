// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ClaimService } from '../services/claim.service';
// import { Router } from '@angular/router';
// import { HttpErrorResponse } from '@angular/common/http';
// import { TemporaryDataService } from '../services/temporary-data.service';
// import { Claim } from '../models/claim';
// import { CustomerService } from '../services/customer.service';
// import { DataService } from '../services/data.service';
// import { AgentService } from '../services/agent.service';

// @Component({
//   selector: 'app-claim-list',
//   templateUrl: './claim-list.component.html',
//   styleUrl: './claim-list.component.css'
// })
// export class ClaimListComponent {
//   claims: Array<any>;
//   claimData: Array<any>;
//   customer: Array<any>;
//   agentData: Array<any>;
//   page: number = 1;
//   totalRecords:number=0
//   selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
//   userRole:string=''
//   constructor(private claimService: ClaimService, private router: Router,private temporaryData:TemporaryDataService,
//     private customerService: CustomerService,private dataService:DataService,private agentService:AgentService) 
//   { 
//     this.claims=new Array<any>()
//     this.claimData=new Array<any>()
//     this.agentData=new Array<any>()
//     this.customer=new Array<any>()
//     this.userRole=temporaryData.getRole()
//     console.log(this.userRole)}

//   ngOnInit(): void {
   
//     this.fetchCustomers()
    
//   }

//   fetchCustomers():void {
//     debugger
//     this.customerService.getAllCustomers().subscribe({
//       next:(data)=>{
//         this.customer=data
//         this.totalRecords=data.length
//         this.fetchAgents()
//       },
//       error(errorResponse:HttpErrorResponse){
//         console.log(errorResponse)
//       }
//     })
//   }

//   fetchAgents():void{
//     this.agentService.getAllAgents().subscribe({
//       next:(response)=>{
//         this.agentData=response
//        console.log(this.agentData)
//        this.filterCustomer()
//       },
//       error(errorResponse:HttpErrorResponse){
//         console.log(errorResponse)
//       }
//     })
//   }

//   fetchClaims(): void {
//     this.claimService.getAllClaims().subscribe(
//       {
//         next:(data)=>{
//         // this.claimData=data
//         this.claims=data
//         console.log(this.claims)
//         this.totalRecords=data.length
//         // debugger
//         // this.filterCustomer();
//         if(this.userRole=="Agent")
//           this.filterClaim();
//       },
//       error:(errorResponse:HttpErrorResponse)=>{
//         console.log(errorResponse); 
//       }
//     }
//     );
    // this.filterClaim();
//   }
 
// //   editClaim(claimId: number): void {
// //     // Navigate to the update claim page with the claim ID
// //     this.router.navigate(['/update-claim', claimId]);
// // }
// resolveClaim(claimId: number): void {
//   this.claimService.getClaimById(claimId).subscribe(
//     (claim: Claim) => {
//       // Assuming 'IsActive' is a boolean property
//       claim.Status = 'Approved';

//       this.claimService.updateClaim(claim).subscribe(
//         (updatedClaim) => {
//           console.log('Claim approved successfully:', updatedClaim);
//           this.fetchClaims();
//         },
//         (error) => {
//           console.error('Error updating claim:', error);
//         }
//       );
//     },
//     (error) => {
//       console.error('Error fetching claim:', error);
//     }
//   );
// }
// getCustomerName(customerId: number): string {
//   if (this.customer) {
//     const customer = this.customer.find((a: any) => a.customerId === customerId);
//     console.log(customer);
//     return customer!=null ? `${customer.firstName} ${customer.lastName}` : 'Customer Not Found';
//   } else {
//     return 'Customer Data Not Loaded';
//   }
// }
// filterCustomer(){
 
//   var agent=this.agentData.find((a: any) => a.userId === this.dataService.userId)
//   if((this.dataService.roleName=="Agent")){
//     this.customer=this.customer.filter(x=>x.agentId === agent.agentId)
//     console.log(this.customer)
//     // this.filterClaim()
//     this.fetchClaims()

//   }
//   else
//     this.fetchClaims()

// }
// filterClaim(){
 
//   if(this.dataService.roleName=="Agent"){
//   for(let c of this.customer){
//     this.claims=this.claims.filter(x=>x.customerId === c.customerId)
//     console.log(this.claims)
//   }
//   }
// }
// onItemsPerPageChange(): void {
//   this.page = 1; // Reset to the first page when items per page changes
//   this.filterClaim(); // Fetch data with the new items per page
// }

  
//}

import { Component } from '@angular/core';
import { ClaimService } from '../services/claim.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Claim } from '../models/claim';
import { CustomerService } from '../services/customer.service';
import { DataService } from '../services/data.service';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent {
  claims: Array<any>;
  claimData: Array<any>;
  customer: Array<any>;
  agentData: Array<any>;
  page: number = 1;
  totalRecords: number = 0;
  selectedItemsPerPage: number = 5;
  userRole: string = '';
  searchTerm: string = '';
  filteredClaims: Array<any>;

  constructor(
    private claimService: ClaimService,
    private router: Router,
    private temporaryData: TemporaryDataService,
    private customerService: CustomerService,
    private dataService: DataService,
    private agentService: AgentService
  ) {
    this.claims = new Array<any>();
    this.claimData = new Array<any>();
    this.agentData = new Array<any>();
    this.customer = new Array<any>();
    this.filteredClaims= new Array<any>();
    this.userRole = temporaryData.getRole();
  }

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customer = data;
        this.totalRecords = data.length;
        this.fetchAgents();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  fetchAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (response) => {
        this.agentData = response;
        this.filterCustomer();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  fetchClaims(): void {
    this.claimService.getAllClaims().subscribe(
      {
        
        next: (data) => {
          this.claims = data;
          this.totalRecords = data.length;
          if (this.userRole == "Agent")
            this.filterClaim();
          console.log(data);
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        }
      }
    );
  }

  resolveClaim(claimId: number): void {
    this.claimService.getClaimById(claimId).subscribe(
      (claim: Claim) => {
        claim.Status = 'Approved';

        this.claimService.updateClaim(claim).subscribe(
          (updatedClaim) => {
            console.log('Claim approved successfully:', updatedClaim);
            this.fetchClaims();
          },
          (error) => {
            console.error('Error updating claim:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching claim:', error);
      }
    );
  }

  getCustomerName(customerId: number): string {
    if (this.customer) {
      const customer = this.customer.find((a: any) => a.customerId === customerId);
      return customer != null ? `${customer.firstName} ${customer.lastName}` : 'Customer Not Found';
    } else {
      return 'Customer Data Not Loaded';
    }
  }

  filterCustomer() {
    var agent = this.agentData.find((a: any) => a.userId === this.dataService.userId);
    if ((this.dataService.roleName == "Agent")) {
      this.customer = this.customer.filter(x => x.agentId === agent.agentId);
      this.fetchClaims();
    }
    else
      this.fetchClaims();
  }

  filterClaim() {
    for (let c of this.customer) {
      this.claims = this.claims.filter(x => x.customerId === c.customerId);
    }
  }

  onItemsPerPageChange(): void {
    this.page = 1;
    this.filterClaim();
  }

  onSearchChange(): void {
    this.page = 1;
    this.filteredClaims = this.claims.filter((claim) => {
      const searchTermLC = this.searchTerm.toLowerCase();
      return (
        claim.claimId.toString().includes(searchTermLC) ||
        claim.claimAmount.toString().includes(searchTermLC) 
        // Add more properties as needed
        // ...
      );
    });
  }
}
