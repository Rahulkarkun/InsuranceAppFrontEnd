import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { CustomerService } from '../services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-insurance-account-filter',
  templateUrl: './insurance-account-filter.component.html',
  styleUrl: './insurance-account-filter.component.css'
})
export class InsuranceAccountFilterComponent {
  policies: Array<any>;
  customer: Array<any>;
  page: number = 1;
  totalRecords:number=0
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  
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
    // this.customerService.getAllCustomers().subscribe({
    //   next:(data)=>{
    //     this.customer=data
    //     this.totalRecords=data.length
    //   },
    //   error(errorResponse:HttpErrorResponse){
    //     console.log(errorResponse)
    //   }
    // })
    this.fetchInsurancePolicies();
  }

  fetchInsurancePolicies(): void {
    this.insurancePolicyService.getAllInsurancePolicy().subscribe(
      {
        next:(data)=>{
        this.policies=data
        console.log(this.policies)
        this.totalRecords=data.length
        this.fetchCustomers()
        //this.filterCustomer()
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
        this.filterPolicies();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }
  filterPolicies(){
    //debugger
    var customer=this.customer.find((a: any) => a.userId === this.dataService.userId)
    //console.log(customer);
    if((this.dataService.roleName=="Customer")){
      this.policies=this.policies.filter(x=>x.customerId === customer.customerId)
      console.log(this.policies)
      //this.filterPayment()
    }
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
