import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { DataService } from '../services/data.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-change-password',
  templateUrl: './customer-change-password.component.html',
  styleUrl: './customer-change-password.component.css'
})
export class CustomerChangePasswordComponent {
  customerData:any
  userRole:string='';
  changePasswordCustomer = new FormGroup({
    id:new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword:new FormControl('')
  })

  customerId:number=0;

  constructor(
    
    private customerService:CustomerService,
    private dataService: DataService,
    private temporaryData:TemporaryDataService,
    private router:Router
    ){
      this.userRole=temporaryData.getRole()
      console.log(this.userRole)
      this.customerId=dataService.userId;
    }
    changeCustomerPassword(data:any){

      this.customerService.changePasswordCustomer(data).subscribe({
        next:(result)=>{
          alert('Password Changed SuccessFully')
          console.log(result)
          this.router.navigateByUrl('/customer-dashboard')
        },
        error:(errorResponse:HttpErrorResponse)=>{
  
          console.log(errorResponse);
          
        }
      })
    }
}
