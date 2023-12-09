import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { CustomerService } from '../services/customer.service';
import { InsuranceplanService } from '../services/insuranceplan.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css'
})
export class CustomerNavbarComponent {
  data:any
  userRole: string = '';
  customerId: number = 0;
  insurancePlanData: any;
 constructor(private router:Router,
  private temporarydata:TemporaryDataService,
  private dataService: DataService,
  private customerService: CustomerService,
  private insurancePlan: InsuranceplanService
  ){
    this.userRole = temporarydata.getRole();
    console.log(this.userRole);
  }
  ngOnInit(): void {
    // this.loginId = this.dataService.userId;
    //debugger
    console.log(this.dataService.userId)
    
    this.customerService.getByuserId(this.dataService.userId).subscribe(
      {
        next: (result) => {
          this.data = result;
          console.log(this.data.customerId)
          // Move the navigation logic here, inside the callback
          this.customerId = this.data.customerId
          // console.log(this.data.AdminId)
          // this.router.navigate(['/admin-profile',result.AdminId]);
          // console.log(result.AdminId)
        },
        error: (error) => {
          console.error('Error fetching customer details:', error);
        }
      }
    );
    this.insurancePlan.getAllInsurancePlan().subscribe({
      next: (result) => {
        this.insurancePlanData = result;
        console.log(this.insurancePlanData)
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }
 setRole(){
  this.temporarydata.setRole('Customer')
  // console.log(this.temporarydata.getRole)
  
}

setInsurancePlanId(id:number){
  this.temporarydata.setRole('Customer')
  this.temporarydata.insurancePlanId=id
  this.router.navigateByUrl('/insurance-plan')
}

// selectInsuranceType(insuranceTypeId: string) {
//   this.insuranceSchemeForm.patchValue({
//     insuranceTypeId: insuranceTypeId
//   });

 deleteToken(){
  localStorage.clear()
  this.router.navigateByUrl("/login")
}
}

