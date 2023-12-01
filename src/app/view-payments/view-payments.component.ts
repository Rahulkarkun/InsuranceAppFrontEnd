import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrl: './view-payments.component.css'
})
export class ViewPaymentsComponent {
  payments: Array<any>;
  page: number = 1;
  totalRecords:number=0
  userRole:string=''
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences

  constructor(private paymentService: PaymentService, private router: Router,private temporaryData:TemporaryDataService) 
  { this.payments=new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      {
        next:(data)=>{
        this.payments=data
        console.log(this.payments)
        this.totalRecords=data.length

      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchPayments(); // Fetch data with the new items per page
  }

}
