import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from '../services/agent.service';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { DataService } from '../services/data.service';
import { CommissionService } from '../services/commission.service';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrl: './commission-list.component.css'
})
export class CommissionListComponent {
  customerData: Array<any>;
  //agents:Array<any>;
  page: number = 1;
  totalRecords:number=0
  userRole:string=''
  agentData: Array<any>;
  commissionData: Array<any>
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  constructor(
    private customerService: CustomerService, 
    private router: Router,
    private dataService:DataService,
    private temporaryData:TemporaryDataService,
    private agentService: AgentService,
    private commissionService: CommissionService) 
  { 
    this.commissionData=new Array<any>()
    this.agentData=new Array<any>()
    this.customerData=new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    //debugger
    this.agentService.getAllAgents().subscribe({
      next:(response)=>{
        this.agentData=response
       
        
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.commissionService.getAllCommissions().subscribe({
      next:(response)=>{
        this.commissionData=response
       
        
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    // debugger
    this.customerService.getAllCustomers().subscribe(
      {
        next:(data)=>{
        this.customerData=data
        console.log(this.customerData)
        this.totalRecords=data.length
        // this.filterCustomer();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  // addCustomer(): void {
  //   this.router.navigateByUrl("/add-customer")
  // }

  // editCustomer(customerId: number): void {
  //   // Navigate to the update agent page with the agent ID
  //   this.router.navigate(['/update-customer', customerId]);
 // }
//  editCustomer(customerId: number): void {
//   if (!isNaN(customerId)) {
//     // Navigate to the update customer page with the customer ID
//     this.router.navigate(['/update-customer', customerId]);
//   } else {
//     console.error('Invalid customer ID:', customerId);
//     // Handle the case where customerId is not a valid number
//   }
// }


// deleteCustomer(customerId: number): void {
//   // Implement the logic to delete the agent using the agent service
//   // For example:
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
// filterCustomer(){
//   var agent=this.agentData.find((a: any) => a.userId === this.dataService.userId)
//   if((this.dataService.roleName=="Agent")){
//     this.customers=this.customers.filter(x=>x.agentId === agent.agentId)
//     console.log('jdsc' + this.customers)
//     this.filterCommission()
//   }
// }

// filterCommission(){
//   //debugger
//   //var claim=this.claims.find((a: any) => a.userId === this.dataService.userId)
//   // if((this.dataService.roleName=="Agent")){
//   //   this.customer=this.customer.filter(x=>x.customerId === claim.customerId)
//   //   console.log('jdsc' + this.customer)
//   for(let c of this.customers){
//     // if((this.dataService.roleName=="Agent")){
//     this.commissionData=this.commissionData.filter(x=>x.customerId === c.customerId)
//     console.log('jdsc' + this.commissionData)
//   }
//   }

getAgentName(agentId: number): string {
  if (this.agentData) {
    const agent = this.agentData.find((a: any) => a.agentId === agentId);
    console.log(agent);
    return agent!=null ? `${agent.firstName} ${agent.lastName}` : 'Customer Not Found';
  } else {
    return 'Customer Data Not Loaded';
  }
}

getCustomerName(customerId: number): string {
  if (this.customerData) {
    const customer = this.customerData.find((a: any) => a.customerId === customerId);
    console.log(customer);
    return customer!=null ? `${customer.firstName} ${customer.lastName}` : 'Customer Not Found';
  } else {
    return 'Customer Data Not Loaded';
  }
}

onItemsPerPageChange(): void {
  this.page = 1; // Reset to the first page when items per page changes
  this.fetchCustomers(); // Fetch data with the new items per page
}
}
