import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../services/claim.service';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AgentService } from '../services/agent.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Claim } from '../models/claim';

@Component({
  selector: 'app-customer-claim-list-filter',
  templateUrl: './customer-claim-list-filter.component.html',
  styleUrl: './customer-claim-list-filter.component.css'
})
export class CustomerClaimListFilterComponent {
  claims: Array<any>;
  customer: Array<any>;
  agentData: Array<any>;
  page: number = 1;
  totalRecords:number=0
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  constructor(private claimService: ClaimService, private router: Router,private temporaryData:TemporaryDataService,
    private customerService: CustomerService,private dataService:DataService,private agentService:AgentService) 
  { 
    this.claims=new Array<any>()
    this.agentData=new Array<any>()
    this.customer=new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    debugger
    var token=localStorage.getItem('token')
    
    var role = this.userRole
    if(token==null){
      alert('Please login')
      this.router.navigateByUrl('/login')
    }
    else if(role!='Customer'){
      alert('Please Login As Customer')
      this.router.navigateByUrl('/login')
    }
    // this.agentService.getAllAgents().subscribe({
    //   next:(response)=>{
    //     this.agentData=response
       
        
    //   },
    //   error(errorResponse:HttpErrorResponse){
    //     console.log(errorResponse)
    //   }
    // })
    // this.customerService.getAllCustomers().subscribe({
    //   next:(data)=>{
    //     this.customer=data
    //     this.totalRecords=data.length
    //   },
    //   error(errorResponse:HttpErrorResponse){
    //     console.log(errorResponse)
    //   }
    // })
    this.fetchClaims();
  }

  fetchClaims(): void {
    //debugger
    this.claimService.getAllClaims().subscribe(
      {
        next:(data)=>{
        this.claims=data
        console.log(this.claims)
        this.totalRecords=data.length
        debugger
        this.fetchCustomers();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }
  fetchCustomers(): void {
    //debugger
    this.customerService.getAllCustomers().subscribe(
      {
        next:(data)=>{
        this.customer=data
        console.log(this.customer)
        this.totalRecords=data.length
        this.filterClaims();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }
  filterClaims(){
    //debugger
    var customer=this.customer.find((a: any) => a.userId === this.dataService.userId)
    //console.log(customer);
    if((this.dataService.roleName=="Customer")){
      this.claims=this.claims.filter(x=>x.customerId === customer.customerId)
      console.log(this.claims)
      //this.filterPayment()
    }
  }
//   editClaim(claimId: number): void {
//     // Navigate to the update claim page with the claim ID
//     this.router.navigate(['/update-claim', claimId]);
// }
resolveClaim(claimId: number): void {
  this.claimService.getClaimById(claimId).subscribe(
    (claim: Claim) => {
      // Assuming 'IsActive' is a boolean property
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
    console.log(customer);
    return customer!=null ? `${customer.firstName} ${customer.lastName}` : 'Customer Not Found';
  } else {
    return 'Customer Data Not Loaded';
  }
}

onItemsPerPageChange(): void {
  this.page = 1; // Reset to the first page when items per page changes
  this.fetchClaims(); // Fetch data with the new items per page
}
addClaim(): void {
  this.router.navigateByUrl("/add-claim")
}
  deleteClaim(claimId: number): void {
    // Implement the logic to delete the agent using the agent service
    // For example:
    this.claimService.deleteClaim(claimId).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchClaims();
      },
      error => {
        console.error('Error deleting agent:', error);
      }
    );
  }
}
