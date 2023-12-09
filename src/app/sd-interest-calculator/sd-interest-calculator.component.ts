import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemedetailsService } from '../services/schemedetails.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { lastValueFrom } from 'rxjs';
import { InsuranceScheme } from '../models/insuranceScheme';

@Component({
  selector: 'app-sd-interest-calculator',
  templateUrl: './sd-interest-calculator.component.html',
  styleUrl: './sd-interest-calculator.component.css'
})
export class SdInterestCalculatorComponent {
  // scheme = new FormGroup({
  //   years : new FormControl('', [Validators.required]),
  //   investmentAmt : new FormControl('', [Validators.required, Validators.maxLength(100)]),
  //   months : new FormControl('', [Validators.required]),
  // })

  scheme! : FormGroup
  
  schemeDetails: any; // Adjust the type based on your actual data structure
  schemeDetailsForm!: FormGroup;
  userRole: string = '';
  schemeName: string = '';
  calculateData:any;
  noMonths=["1","3","6","12"];
  divideYears:number=0;
  totalAmt:number=0;
  installmentAmt:number=0;
  interestAmt:number=0;

  constructor(private route: ActivatedRoute,
    private schemeDetailsService: SchemedetailsService,
    private fb: FormBuilder,
    private temporaryData: TemporaryDataService,
    private router: Router,
    private insuranceSchemeService: InsuranceSchemeService
    ) {
      this.userRole = temporaryData.getRole();
    console.log(this.userRole)
    }

  ngOnInit(): void {
    this.schemeDetailsForm = this.fb.group({
      DetailId: [0,Validators.required],
      SchemeImage: ['', Validators.required],
      Description: ['', Validators.required],
      MinAmount: [0, Validators.required],
      MaxAmount: [0, Validators.required],
      MinInvestmentTime: [0, Validators.required],
      MaxInvestmentTime: [0, Validators.required],
      MinAge: [0, Validators.required],
      MaxAge: [0],
      ProfitRatio: [0],
      RegistrationCommRatio: [0],
      InstallmentCommRatio: [0],
      SchemeId: [0]
      // agentId: [0],
      // userId: [0]
    });
    this.scheme = this.fb.group({
    years : ['', Validators.required],
    investmentAmt : ['', Validators.required, Validators.maxLength(100)],
    months : ['', Validators.required],
  })
    // this.route.data.subscribe((data) => {
    //   this.schemeDetails = data['schemeDetails'];
    //   console.log(this.schemeDetails);
    //   this.fetchSchemeDetails();
    // });

    this.schemeDetails = history.state.schemeDetails;
    console.log(this.schemeDetails)
    debugger
    if (this.schemeDetails) {
      console.log(this.schemeDetails)
      this.fetchSchemeDetails();
      this.getSchemeName();
    }
  }
  private fetchSchemeDetails(): void {

    const schemeDetailsFormValue = {
      DetailId: this.schemeDetails.detailId,
      SchemeImage: this.schemeDetails.schemeImage,
      Description: this.schemeDetails.description,
      MinAmount: this.schemeDetails.minAmount,
      MaxAmount: this.schemeDetails.maxAmount,
      MinInvestmentTime: this.schemeDetails.minInvestmentTime,
      MaxInvestmentTime: this.schemeDetails.maxInvestmentTime,
      MinAge: this.schemeDetails.minAge,
      MaxAge: this.schemeDetails.maxAge,
      ProfitRatio: this.schemeDetails.profitRatio,
      RegistrationCommRatio: this.schemeDetails.registrationCommRatio,
      InstallmentCommRatio: this.schemeDetails.installmentCommRatio,
      SchemeId: this.schemeDetails.schemeId,
    };
    console.log(this.schemeDetails.schemeId)
    this.schemeDetailsForm.patchValue(schemeDetailsFormValue);
  }

  getSchemeName(): void {
    this.insuranceSchemeService.getInsuranceSchemeById(this.schemeDetails.schemeId).subscribe({
      next: (response) => {
        console.log(response);
        this.schemeName = response.schemeName;
        console.log(this.schemeName);
      },
      error: (error) => {
        console.error('Error fetching Scheme Details:', error);
      },
    });
  }

  calculateInterest(data:any){

    this.calculateData=data
    if(this.calculateData.months==12){
      this.divideYears=this.calculateData.years
      this.temporaryData.installmentAmt=this.calculateData.investmentAmt/this.divideYears
    }
    if(this.calculateData.months==6){
      this.divideYears=this.calculateData.years *2
    }
    if(this.calculateData.months==3){
      this.divideYears=this.calculateData.years*4
    }
    if(this.calculateData.months==3){
      this.divideYears=this.calculateData.years*12
    }
    this.temporaryData.interestAmt=this.calculateData.investmentAmt * 0.06
    this.temporaryData.totalAmt= Number.parseInt(this.calculateData.investmentAmt) + this.temporaryData.interestAmt
    console.log(typeof this.calculateData.investmentAmt);
    console.log(typeof this.temporaryData.interestAmt);
    
    
    console.log(this.calculateData);
    this.temporaryData.policyTerm=data.years
    console.log(this.temporaryData.policyTerm);
    
    this.temporaryData.totalInvestmentAmt=data.investmentAmt
    this.temporaryData.months=data.months 
    
  }
  
}
