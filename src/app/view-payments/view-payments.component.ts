import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';
import { CustomerService } from '../services/customer.service';
import { AgentService } from '../services/agent.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrl: './view-payments.component.css'
})
export class ViewPaymentsComponent {
  // claims: Array<any>;
  // customer: Array<any>;
  // agentData: Array<any>;
  payments: Array<any>;
  customer: Array<any>;
  agentData: Array<any>;
  page: number = 1;
  totalRecords:number=0
  userRole:string=''
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences

  constructor(private paymentService: PaymentService, private router: Router,private temporaryData:TemporaryDataService,
    private customerService:CustomerService,private agentService:AgentService,private dataService:DataService) 
  { this.payments=new Array<any>()
    this.agentData=new Array<any>()
    this.customer=new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
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
    this.fetchPayments();
  }

  fetchPayments(): void {
    debugger
    this.paymentService.getAllPayments().subscribe(
      {
        next:(data)=>{
        this.payments=data
        console.log(this.payments)
        this.totalRecords=data.length
        this.filterCustomer()

      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
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
      this.filterPayment()
    }
  }
  filterPayment(){
    //debugger
    //var claim=this.claims.find((a: any) => a.userId === this.dataService.userId)
    // if((this.dataService.roleName=="Agent")){
    //   this.customer=this.customer.filter(x=>x.customerId === claim.customerId)
    //   console.log('jdsc' + this.customer)
    for(let c of this.customer){
      if((this.dataService.roleName=="Agent")){
      this.payments=this.payments.filter(x=>x.customerId === c.customerId)
      console.log('jdsc' + this.customer)
    }
    }
  }
  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchPayments(); // Fetch data with the new items per page
  }

}
