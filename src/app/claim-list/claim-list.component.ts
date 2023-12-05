import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  styleUrl: './claim-list.component.css'
})
export class ClaimListComponent {
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
    this.agentService.getAllAgents().subscribe({
      next:(response)=>{
        this.agentData=response
       
        
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.customerService.getAllCustomers().subscribe({
      next:(data)=>{
        this.customer=data
        this.totalRecords=data.length
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
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
        this.filterCustomer();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
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
filterCustomer(){
  var agent=this.agentData.find((a: any) => a.userId === this.dataService.userId)
  if((this.dataService.roleName=="Agent")){
    this.customer=this.customer.filter(x=>x.agentId === agent.agentId)
    console.log('jdsc' + this.customer)
    this.filterClaim()
  }
}
filterClaim(){
  //debugger
  //var claim=this.claims.find((a: any) => a.userId === this.dataService.userId)
  // if((this.dataService.roleName=="Agent")){
  //   this.customer=this.customer.filter(x=>x.customerId === claim.customerId)
  //   console.log('jdsc' + this.customer)
  for(let c of this.customer){
    if((this.dataService.roleName=="Agent")){
    this.claims=this.claims.filter(x=>x.customerId === c.customerId)
    console.log('jdsc' + this.customer)
  }
  }
}
onItemsPerPageChange(): void {
  this.page = 1; // Reset to the first page when items per page changes
  this.fetchClaims(); // Fetch data with the new items per page
}

  // deleteClaim(claimId: number): void {
  //   // Implement the logic to delete the agent using the agent service
  //   // For example:
  //   this.claimService.deleteClaim(claimId).subscribe(
  //     () => {
  //       // Update the agents list after successful deletion
  //       this.fetchClaims();
  //     },
  //     error => {
  //       console.error('Error deleting agent:', error);
  //     }
  //   );
  // }
        }
