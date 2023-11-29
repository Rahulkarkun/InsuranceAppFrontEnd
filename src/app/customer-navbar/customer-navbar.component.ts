import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css'
})
export class CustomerNavbarComponent {
 constructor(private router:Router,
  private temporarydata:TemporaryDataService,
  private dataService: DataService,
  private customerService: CustomerService 
  ){}
  // ngOnInit(): void {
  //   // this.loginId = this.dataService.userId;
  //   debugger
  //   console.log(this.dataService.userId)
  //   this.customerService.getByuserId(this.dataService.userId).subscribe(
  //     {
  //       next: (result) => {
  //         this.data = result;
  //         console.log(this.data.adminId)
  //         // Move the navigation logic here, inside the callback
  //         this.adminId = this.data.adminId
  //         // console.log(this.data.AdminId)
  //         // this.router.navigate(['/admin-profile',result.AdminId]);
  //         // console.log(result.AdminId)
  //       },
  //       error: (error) => {
  //         console.error('Error fetching customer details:', error);
  //       }
  //     }
  //   );
  // }
 setRole(){
  this.temporarydata.setRole('Customer')
  // console.log(this.temporarydata.getRole)
  
}
 deleteToken(){
  localStorage.clear()
  this.router.navigateByUrl("/login")
}
}

