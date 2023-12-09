import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-insurance-account',
  templateUrl: './insurance-account.component.html',
  styleUrl: './insurance-account.component.css'
})
export class InsuranceAccountComponent {
  account!: FormGroup
  userRole: string = '';
  CustomerId: number = 0;
  customerData: Array<any>;
  constructor(
  private fb: FormBuilder,
  private dataService: DataService,
  protected temporaryData: TemporaryDataService,
  private customerService: CustomerService,
  // private insuranceService: InsuranceService,
  private router: Router,
  protected dataS:DataService,
  private policyService: InsurancePolicyService
  ){
    this.customerData = new Array<any>()
    this.userRole = temporaryData.getRole();
    // this.premiumType=this.temporaryData.premiumType
    this.policyTerm=this.temporaryData.policyTerm
    this.c = new Date(this.year + this.policyTerm, this.month, this.day)
    this.maturityDate=this.c.toISOString().split('T')[0];
    console.log(this.userRole)}


  ngOnInit(): void {
    this.account = this.fb.group({
      issueDate: ['', Validators.required],
      maturityDate: ['', Validators.required],
      // policyTerm: ['', Validators.required],
      premiumType: ['', Validators.required],
      premiumAmount: ['', Validators.required],
      // profitRatio: ['', Validators.required,],
      sumAssured: ['', Validators.required],
      status: 'Ongoing',
      customerId: [null],
      schemeId: [0]
    })
    this.customerService.getByuserId(this.dataService.userId).subscribe({
      next: (customerData) => {
        console.log('Customer data received:', customerData);
        this.CustomerId = customerData.customerId;
        console.log(this.CustomerId)
        this.account.patchValue({
          customerId: this.CustomerId})
      },
      error: (error) => {
        console.error('Error fetching customer details:', error);
      }
    });
    
  }

  date=new Date().toISOString().split('T')[0];
  // date2=new Date()
  // maturityDate=this.date2.setFullYear(this.date2.getFullYear() + 1)
  premiumType:string=''
  policyTerm:number=0
  c=new Date()
  maturityDate:string=''
  d = new Date();
  year = this.d.getFullYear();
  month =this.d.getMonth();
  day = this.d.getDate();
  

  storeInsuranceData(data:any){
    debugger
    this.temporaryData.insuranceAccountData=data
    this.addPolicy()
  }

  async addPolicy(): Promise<void> {
    try {
      console.log(this.account.value)
      const addedPolicy = await lastValueFrom(this.policyService.addInsurancePolicy(this.account.value));
      console.log('Policy added:', addedPolicy);

      // Display an alert to the user
      alert('Policy added successfully!');
      // if(this.userRole=='Admin')
      //   this.router.navigateByUrl("/admin-dashboard")
      // if(this.userRole=='Employee')
      //   this.router.navigateByUrl("/employee")

      // Optionally, you can reset the form or perform any other actions here
      // this.agentForm.reset();
    } catch (error) {
      console.error('Error adding policy:', error);

      // Display an error alert to the user
      alert('Error adding policy. Please try again.');
    }
  }

}


