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
    debugger
    this.agentService.getAllAgents().subscribe(
      {
        next:(data)=>{
        this.agentData=data
        console.log(this.customer)
        this.totalRecords=data.length
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
    this.fetchCustomers()
    // this.fetchPayments()
  }

  fetchPayments(): void {
   // debugger
    this.paymentService.getAllPayments().subscribe(
      {
        next:(data)=>{
        this.payments=data
        console.log(this.payments)
        this.totalRecords=data.length
        this.filterPayment()
        // this.fetchCustomers()

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
        // this.filterPayment();
        this.fetchPayments();
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
  filterPayment(){
    //debugger
    var customer=this.customer.find((a: any) => a.userId === this.dataService.userId)
    //console.log(customer);
    if((this.dataService.roleName=="Customer")){
      this.payments=this.payments.filter(x=>x.customerId === customer.customerId)
      console.log(this.payments)
      //this.filterPayment()
    }
    if((this.dataService.roleName=="Agent")){
      this.filterCustomersOfAgent();
      // // this.payments=this.payments.filter(x=>x.customerId === agent.customerId)
      // // console.log(this.payments)
      //this.filterPayment()
    }
  }

  filterCustomersOfAgent(){
    //debugger
    // var customer=this.customer.find((a: any) => a.userId === this.dataService.userId)
    //console.log(customer);
    var agent = this.agentData.find((a: any) => a.userId === this.dataService.userId)
    if((this.dataService.roleName=="Agent")){
      var customer=this.customer.filter(x=>x.agentId === agent.agentId)
      console.log(customer)
      for(let c of customer){
        // if((this.dataService.roleName=="Agent")){
        this.payments=this.payments.filter(x=>x.customerId === c.customerId)
        console.log('jdsc' + this.customer)
      //this.filterPayment()
    }
  }
  }
  // filterPayment(){
  //   //debugger
  //   //var claim=this.claims.find((a: any) => a.userId === this.dataService.userId)
  //   // if((this.dataService.roleName=="Agent")){
  //   //   this.customer=this.customer.filter(x=>x.customerId === claim.customerId)
  //   //   console.log('jdsc' + this.customer)
  //   for(let c of this.customer){
  //     if((this.dataService.roleName=="Agent")){
  //     this.payments=this.payments.filter(x=>x.customerId === c.customerId)
  //     console.log('jdsc' + this.customer)
  //   }
  //   }
  // }
  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchPayments(); // Fetch data with the new items per page
  }

}
