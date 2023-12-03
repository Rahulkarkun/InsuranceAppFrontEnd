import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css'
})
export class AgentDashboardComponent {
  userName:any;
  userId:any;
  constructor(private router: Router,private temporarydata:TemporaryDataService,private data:DataService) 
  {this.userName=data.userName
    this.userId=data.userId
   }

  ngOnInit(): void {
  }

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }
  // addCustomer(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/add-customer")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // addAgent(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/add-agent")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // agentList(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/agent-list")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // addEmployee(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/add-employee")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // employeeList(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/employee-list")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  customerList(){
    console.log("hih")
    //debugger
    this.temporarydata.setRole('Agent')
    this.router.navigateByUrl("/agent-customer-list")
    // console.log(this.temporarydata.getRole)
  }
  // addInsurancePlan(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/add-insurance-plan")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // insurancePlanList(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/insurance-plan-list")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // addInsuranceScheme(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/add-insurance-scheme")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // insuranceSchemeList(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/insurance-scheme-list")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  viewPayments(){
    console.log("hih")
    //debugger
    this.temporarydata.setRole('Agent')
    this.router.navigateByUrl("/view-payments")
    // console.log(this.temporarydata.getRole)
    
  }
  // addSchemeDetails(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/add-scheme-details")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // viewSchemeDetails(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/schemedetails-list")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // addInsurancePolicy(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/add-insurance-policy")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  // viewPolicyList(){
  //   console.log("hih")
  //   //debugger
  //   this.temporarydata.setRole('Admin')
  //   this.router.navigateByUrl("/insurance-policy-list")
  //   // console.log(this.temporarydata.getRole)
    
  // }
  viewClaim(){
    console.log("hih")
    //debugger
    this.temporarydata.setRole('Agent')
    this.router.navigateByUrl("/claim-list")
    // console.log(this.temporarydata.getRole)
    
  }
}