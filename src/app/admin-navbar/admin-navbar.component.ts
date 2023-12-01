import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { DataService } from '../services/data.service';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit{
  // loginId: number = 0;
  data: any;
  adminId: number = 0;
  constructor(private router:Router,
    private temporarydata:TemporaryDataService,
    private dataService: DataService,
    private adminService: AdminService

    ){
  }

  ngOnInit(): void {
    // this.loginId = this.dataService.userId;
    debugger
    console.log(this.dataService.userId)
    this.adminService.getByuserId(this.dataService.userId).subscribe(
      {
        next: (result) => {
          this.data = result;
          console.log(result)
          console.log(this.data.adminId)
          // Move the navigation logic here, inside the callback
          this.adminId = this.data.adminId
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
    this.temporarydata.setRole('Admin')
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
