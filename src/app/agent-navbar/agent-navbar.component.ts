import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { AgentService } from '../services/agent.service';


@Component({
  selector: 'app-agent-navbar',
  templateUrl: './agent-navbar.component.html',
  styleUrl: './agent-navbar.component.css'
})
export class AgentNavbarComponent implements OnInit{
  // loginId: number = 0;
  data: any;
  adminId: number = 0;
  agentId: number = 0;
  constructor(private router:Router,
    private temporarydata:TemporaryDataService,
    private dataService: DataService,
    private agentService: AgentService

    ){
  }

  ngOnInit(): void {
    // this.loginId = this.dataService.userId;
    debugger
    console.log(this.dataService.userId)
    this.agentService.getByUserId(this.dataService.userId).subscribe(
      {
        next: (result) => {
          this.data = result;
          console.log(result)
          // console.log(this.data.agentId)
          // Move the navigation logic here, inside the callback
          // this.agentId = this.data.agentId
          // console.log(this.data.AdminId)
          // this.router.navigate(['/admin-profile',result.AdminId]);
          // console.log(result.AdminId)
        },
        error: (error) => {
          console.error('Error fetching customer details:', error);
        }
      }
    );
  }
  setRole(){
    console.log("hih")
    this.temporarydata.setRole('Agent')
    // console.log(this.temporarydata.getRole)
    
  }
  deleteToken(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }

//   navigateToAdminProfile(): void {
//     debugger
//   this.adminService.getByuserId(this.loginId).subscribe(
//     {
//       next: (result) => {
//         this.data = result;
//         console.log(result.AdminId)
//         // Move the navigation logic here, inside the callback
//         this.adminId = result.AdminId
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

}