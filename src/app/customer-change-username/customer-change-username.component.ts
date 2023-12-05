import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { DataService } from '../services/data.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-change-username',
  templateUrl: './customer-change-username.component.html',
  styleUrl: './customer-change-username.component.css'
})
export class CustomerChangeUsernameComponent {
  customerData:any
  userRole:string='';
  changeUsernameCustomer = new FormGroup({
    id:new FormControl(''),
    oldUsername: new FormControl(''),
    newUsername:new FormControl('')
  })

  customerId:number=0;

  constructor(
    private customerService:CustomerService,
    private dataService: DataService,
    private temporaryData:TemporaryDataService,
    private router:Router
    ){
      temporaryData.setRole('Customer')
      this.userRole=temporaryData.getRole()
      console.log(this.userRole)
      this.customerId=dataService.userId;
    }

    changeCustomerUsername(data:any){

      this.customerService.changeUsernameCustomer(data).subscribe({
        next:(result)=>{
          alert('Username Changed SuccessFully')
          console.log(result)
          this.router.navigateByUrl('/customer-dashboard')
        },
        error:(errorResponse:HttpErrorResponse)=>{
  
          console.log(errorResponse);
          
        }
      })
    }
}
