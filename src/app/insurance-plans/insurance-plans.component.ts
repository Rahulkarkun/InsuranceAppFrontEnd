import { Component } from '@angular/core';
import { TemporaryDataService } from '../services/temporary-data.service';
import { InsuranceplanService } from '../services/insuranceplan.service';
import { InsuranceSchemeService } from '../services/insurance-scheme.service';
import { SchemedetailsService } from '../services/schemedetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-plans',
  templateUrl: './insurance-plans.component.html',
  styleUrls: ['./insurance-plans.component.css']
})

export class InsurancePlansComponent {
  insurancePlanId: number = 0;
  insurancePlanData: any[]; // Change the type to array
  insurancePlanName: string = '';
  insuranceSchemeData:any[];
  insuranceSchemeDetailsData:any[];
  userRole:string=''
  constructor(
    private insuranceplanService: InsuranceplanService,
    private temporaryData: TemporaryDataService,
    private insuranceSchemeService: InsuranceSchemeService,
    private schemeDetailsService: SchemedetailsService,
    private router:Router
  ) {
    this.userRole=temporaryData.getRole()
    this.insurancePlanData = []; // Initialize as an empty array
    this.insurancePlanId = temporaryData.insurancePlanId;
    console.log(this.insurancePlanId)
    this.insuranceSchemeData= [];
    this.insuranceSchemeDetailsData = [];
    insuranceplanService.getInsurancePlanById(this.insurancePlanId).subscribe(
      (data: any) => {
        this.insurancePlanData = data;
        console.log(this.insurancePlanData);
        this.insurancePlanName = data.planName;
        console.log(this.insurancePlanName);
      },
      (error) => {
        console.error('Error fetching insurance plan data:', error);
      }
    );
    insuranceSchemeService.getAllInsuranceScheme().subscribe((data)=>{
      this.insuranceSchemeData=data
      console.log(this.insuranceSchemeData)
      this.insuranceSchemeData=this.insuranceSchemeData.filter(x=>x.planId===this.insurancePlanId)
      console.log(this.insuranceSchemeData);
      
    })
    schemeDetailsService.getAllSchemeDetails().subscribe((data)=>{
      this.insuranceSchemeDetailsData=data
      console.log(this.insuranceSchemeDetailsData)
    })
  }
  ngOnInit(): void {
    var token=localStorage.getItem('token')
    
    var role = this.userRole
    if(token==null){
      alert('Please login')
      this.router.navigateByUrl('/login')
    }
    else if(role!='Customer'){
      alert('Please Login As Customer')
      this.router.navigateByUrl('/login')
    }
  }
  filterInsuranceSchemeDetails(schemeId:number){
    this.insuranceSchemeDetailsData=this.insuranceSchemeDetailsData.filter(x=>x.schemeId===schemeId)

  }
  setInsuranceSchemeId(id:number){
    // debugger
      console.log(id);
      this.temporaryData.insuranceSchemeId=id
      this.insuranceSchemeService.getDetailsBySchemeId(id).subscribe(
        (details) => {
          // Update the agents list after successful deletion
          console.log(details)
          this.router.navigate(['/sd-interest-calculator'], { state: { schemeDetails: details } });
          // debugger
          // this.router.navigate(['/scheme-details'], { state: { schemeDetails: details } });
        },
        (error) => {
          console.error('Error fetching Scheme Details:', error);
        }
      );
      // this.router.navigateByUrl('/sd-interest-calculator')
    
    }

    viewInsuranceDetails(schemeId: number): void {
      this.insuranceSchemeService.getDetailsBySchemeId(schemeId).subscribe(
        (details) => {
          // Update the agents list after successful deletion
          console.log(details)
          this.router.navigate(['/scheme-details'], { state: { schemeDetails: details } });
          // debugger
          // this.router.navigate(['/scheme-details'], { state: { schemeDetails: details } });
        },
        (error) => {
          console.error('Error fetching Scheme Details:', error);
        }
      );
    }
}
