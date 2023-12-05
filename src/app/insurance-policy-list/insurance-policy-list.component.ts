import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-insurance-policy-list',
  templateUrl: './insurance-policy-list.component.html',
  styleUrl: './insurance-policy-list.component.css'
})
export class InsurancePolicyListComponent {
  policies: Array<any>;
  // customers: Array<any>;
  page: number = 1;
  totalRecords:number=0
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  // customers: { [key: number]: Customer } = {};
  customer: Array<any>;
  constructor(
    private insurancePolicyService: InsurancePolicyService, 
    private router: Router,
    private dataService:DataService,
    private temporaryData:TemporaryDataService,
    private customerService: CustomerService) 
  { this.policies=new Array<any>()
    this.customer = new Array<any>();
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe({
      next:(data)=>{
        this.customer=data
        this.totalRecords=data.length
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.fetchInsurancePolicies();
  }

  fetchInsurancePolicies(): void {
    this.insurancePolicyService.getAllInsurancePolicy().subscribe(
      {
        next:(data)=>{
        this.policies=data
        console.log(this.policies)
        //this.filterCustomer()
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }
  // filterCustomer(){
  //   var policy=this.policies.find((a: any) => a.userId === this.dataService.userId)
  //   if((this.dataService.roleName=="Customer")){
  //     this.customer=this.customer.filter(x=>x.customerId === policy.customerId)
  //     console.log('jdsc' + this.customer)
  //   }
  // }

  // fetchInsurancePolicies(): void {
  //   this.insurancePolicyService.getAllInsurancePolicy().subscribe(
  //     {

  //       next: (data) => {
  //         this.policies = data;
  //         console.log(this.policies);

  //         // Fetch customer details for each policy
  //         this.policies.forEach((policy: any) => {
  //           debugger
  //           this.getCustomerName(policy.customerId);
  //         });
  //       },
  //       error: (errorResponse: HttpErrorResponse) => {
  //         console.log(errorResponse);
  //       }
  //     }
  //   );
  // }



  getCustomerName(customerId: number): string {
    if (this.customer) {
      const customer = this.customer.find((a: any) => a.customerId === customerId);
      console.log(customer);
      return customer!=null ? `${customer.firstName} ${customer.lastName}` : 'Customer Not Found';
    } else {
      return 'Customer Data Not Loaded';
    }
  }

  editInsurancePolicy(policyNo: number): void {
    // Navigate to the update agent page with the agent ID
    this.router.navigate([`/update-insurance-policy/${policyNo}`]);
  }

  deleteInsurancePolicy(policyNo: number): void {
    // Implement the logic to delete the agent using the agent service
    // For example:
    this.insurancePolicyService.deleteInsurancePolicy(policyNo).subscribe(
      () => {
        // Update the agents list after successful deletion
        this.fetchInsurancePolicies();
      },
      error => {
        console.error('Error deleting Policy:', error);
      }
    );
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchInsurancePolicies(); // Fetch data with the new items per page
  }

}
