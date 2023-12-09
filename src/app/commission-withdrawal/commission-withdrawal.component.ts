import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommissionService } from '../services/commission.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { CommissionWithdrawalService } from '../services/commission-withdrawal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'app-commission-withdrawal',
  templateUrl: './commission-withdrawal.component.html',
  styleUrl: './commission-withdrawal.component.css'
})
export class CommissionWithdrawalComponent {
  addWithdrawal!: FormGroup
  commissionData:any
  commissionDataOfAgent:any
  agentData:any
  total:number=0;
  totalWithdrawalAmount:number=0
  // addWithrawal = new FormGroup({
  //   // id: new FormGroup(''),
  //   requestDate : new FormControl(''),
  //   withdrawalAmount: new FormControl(''),
  //   agentId:new FormControl(''),
  //   // isApproved:new FormControl('')
   
  // })
  agentId:number=0
  constructor(
    private commissionService:CommissionService,
    private commissionWithdrawalService: CommissionWithdrawalService,
    private router:Router,
    protected temporaryData:TemporaryDataService,
    private dataService:DataService,
    private agentService: AgentService,
    private fb:FormBuilder){
    // debugger
    // this.agentId=dataService.userId
    // console.log(this.agentId)
    commissionService.getAllCommissions().subscribe({
      next:(result)=>{
        this.commissionData=result
      console.log(this.commissionData);
      this.fetchAgents()
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
        alert(errorResponse.error)
      }
    })
    // this.calculateTotal()
    // this.makeTotalZero()
  }

  ngOnInit(): void {
    this.addWithdrawal = this.fb.group({
      withdrawalDate: ['', Validators.required],
      withdrawalAmount: ['', Validators.required],
      agentId: ['', Validators.required],
    })
  }
  addCommisionWithdrawal(data:any){
    debugger
    this.commissionWithdrawalService.addCommissionWithdrawal(data).subscribe({
      next:(result)=>{
        alert("Commision withdrawal Added Successfully")
        console.log(result)
        this.router.navigateByUrl("/agent-dashboard")
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse)
      }
    })
  }

  fetchAgents(){
    this.agentService.getByUserId(this.dataService.userId).subscribe({
      next:(result)=>{
        this.agentData=result
        this.agentId=this.agentData.agentId
        console.log(this.agentId)
      console.log(this.agentData);
      // debugger
      this.filterCommission()
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
        alert(errorResponse.error)
      }
    })
  }

  filterCommission(){
    this.commissionDataOfAgent = this.commissionData.filter((a: any) => a.agentId === this.agentData.agentId)
    console.log(this.commissionDataOfAgent)
  }

  calculateTotal():number{
    if(this.commissionDataOfAgent)
    {
    // debugger
    // if (!this.commisionData) {
    //   return 0;
    // }
 
   for (var commission of this.commissionDataOfAgent){
    this.total=this.total+commission.commissionAmount
    console.log(this.total)
   }
  }
   return this.total
  }
 
  makeTotalZero(){
    this.total=0;
  }

}
