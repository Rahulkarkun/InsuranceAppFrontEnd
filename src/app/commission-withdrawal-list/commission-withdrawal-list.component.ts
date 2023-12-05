import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { CommissionWithdrawalService } from '../services/commission-withdrawal.service';
import { AgentService } from '../services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commission-withdrawal-list',
  templateUrl: './commission-withdrawal-list.component.html',
  styleUrl: './commission-withdrawal-list.component.css'
})
export class CommissionWithdrawalListComponent {
  withdrawalData: Array<any>;
  page: number = 1;
  totalRecords: number = 0;
  total: number = 0;
  agentData: Array<any>;
  // agentData: any;
  userRole: string = '';
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences

  constructor(
    private commissionWithdrawal: CommissionWithdrawalService,
    private temporaryData: TemporaryDataService,
    private data: DataService,
    private agentService: AgentService,
  ) {
    this.agentData=new Array<any>()
    this.withdrawalData = new Array<any>();
    this.userRole = temporaryData.getRole();
  }

  ngOnInit(): void {
    //debugger
    this.agentService.getAllAgents().subscribe({
      next:(response)=>{
        this.agentData=response
       
        
      },
      error(errorResponse:HttpErrorResponse){
        console.log(errorResponse)
      }
    })
    this.fetchData()
  }

  calculateTotal() {
    for (var withdrawal of this.withdrawalData) {
      this.total = this.total + withdrawal.withdrawalAmount;
    }
    return this.total;
  }

  makeTotalZero() {
    this.total = 0;
  }

  onItemsPerPageChange(): void {
    this.page = 1; // Reset to the first page when items per page changes
    this.fetchData(); // Fetch data with the new items per page
  }

  fetchData(): void {
    this.commissionWithdrawal.getCommissonWithdrawal().subscribe((data) => {
      this.withdrawalData = data;
      if (this.userRole === 'Agent') {
        this.withdrawalData = this.withdrawalData.filter((x: any) => x.agentId === this.data.userId);
      }
    });
  }

  fetchAgentName(agentId:number): string {
    // this.commissionWithdrawal.getCommissonWithdrawal().subscribe((data) => {
      // this.withdrawalData = data;
      const agent = this.agentData.find((x: any) => x.agentId === agentId);
      // this.withdrawalData = this.withdrawalData.filter((x: any) => x.agentId === agentId);
      return this.withdrawalData!=null ? `${agent.firstName} ${agent.lastName}` : 'Customer Not Found';
  }
}
