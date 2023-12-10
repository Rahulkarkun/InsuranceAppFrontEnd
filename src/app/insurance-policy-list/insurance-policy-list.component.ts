import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { DataService } from '../services/data.service';
import { AgentService } from '../services/agent.service';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { InsuranceplanService } from '../services/insuranceplan.service';

@Component({
  selector: 'app-insurance-policy-list',
  templateUrl: './insurance-policy-list.component.html',
  styleUrl: './insurance-policy-list.component.css'
})
export class InsurancePolicyListComponent {
  policies: Array<any>;
  agentData: Array<any>;
  schemeData: Array<any>;
  planData:Array<any>;
  // customers: Array<any>;
  page: number = 1;
  totalRecords:number=0
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  // customers: { [key: number]: Customer } = {};
  customer: Array<any>;
  constructor(
    private insurancePolicyService: InsurancePolicyService,
    private planService: InsuranceplanService,
    private router: Router,
    private dataService:DataService,
    private temporaryData:TemporaryDataService,
    private agentService:AgentService,
    private schemeService:InsuranceSchemeService,
    private customerService: CustomerService) 
  { this.planData=new Array<any>()
    this.agentData=new Array<any>()
    this.schemeData=new Array<any>()
    this.policies=new Array<any>()
    this.customer = new Array<any>();
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Admin' && role !== 'Agent') {
      alert('Please Login As Admin or Customer');
      this.router.navigateByUrl('/login');
    }
    debugger
    this.customerService.getAllCustomers().subscribe({
      next:(data)=>{
        this.customer=data
        this.totalRecords=data.length
        this.fetchInsurancePolicies()
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.schemeService.getAllInsuranceScheme().subscribe({
      next:(data)=>{
        this.schemeData=data
        this.totalRecords=data.length
        // this.filterCustomersOfAgent()
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.planService.getAllInsurancePlan().subscribe({
      next:(data)=>{
        this.planData=data
        this.totalRecords=data.length
        // this.filterCustomersOfAgent()
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
  }

  fetchInsurancePolicies(): void {
    this.insurancePolicyService.getAllInsurancePolicy().subscribe(
      {
        next:(data)=>{
        this.policies=data
        console.log(this.policies)
        this.filterCustomer()
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  filterCustomer(){
    // var policy=this.policies.find((a: any) => a.userId === this.dataService.userId)
    if((this.dataService.roleName=="Agent")){
      this.fetchAgents();
    }
    if((this.dataService.roleName=="Customer")){
      var policy=this.policies.find((a: any) => a.userId === this.dataService.userId)
      this.customer=this.customer.filter(x=>x.customerId === policy.customerId)
      console.log('jdsc' + this.customer)
    }
  }

  fetchAgents(){
    this.agentService.getAllAgents().subscribe({
      next:(data)=>{
        this.agentData=data
        this.totalRecords=data.length
        this.filterCustomersOfAgent()
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    
    //   console.log('jdsc' + this.customer)
  }

  filterCustomersOfAgent(){
    var agent = this.agentData.find((a: any) => a.userId === this.dataService.userId)
    var customer=this.customer.filter(x=>x.agentId === agent.agentId)
      console.log(customer)
      for(let c of customer){
        // if((this.dataService.roleName=="Agent")){
        this.policies=this.policies.filter(x=>x.customerId === c.customerId)
        console.log('jdsc' + this.customer)
    // this.customer=this.customer.filter(x=>x.customerId === agent.customerId)
  }
}

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

  getPlanName(schemeId: number): string{
    if (this.schemeData) {
      const scheme = this.schemeData.find((a: any) => a.schemeId === schemeId);
      if(scheme)
      var plan = this.planData.find((a: any) => a.planId === scheme.planId)
      console.log(plan);
      return scheme!=null ? `${plan.planName}` : 'Plan Not Found';
    } else {
      return 'Plan Data Not Loaded';
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

  getSchemeName(schemeId: number): string {
    // this.schemeService.getAllInsuranceScheme().subscribe({
    //   next:(data)=>{
    //     this.agentData=data
    //     this.totalRecords=data.length
    //     this.filterCustomersOfAgent()
    //   },
    //   error(errorResponse:HttpErrorResponse){
    //     console.log(errorResponse)
    //   }
    // })
    if (this.schemeData) {
      const scheme = this.schemeData.find((a: any) => a.schemeId === schemeId);
      console.log(scheme);
      return scheme!=null ? `${scheme.schemeName}`: 'Scheme Not Found';
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
