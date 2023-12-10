import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-admin-change-username',
  templateUrl: './admin-change-username.component.html',
  styleUrl: './admin-change-username.component.css'
})
export class AdminChangeUsernameComponent {
  adminData:any
  userRole:string='';
  changeUsernameAdmin = new FormGroup({
    id:new FormControl(''),
    oldUsername: new FormControl(''),
    newUsername:new FormControl('')
  })

  adminId:number=0;

  constructor(
    private adminService:AdminService,
    private dataService: DataService,
    private temporaryData:TemporaryDataService,
    private router:Router
    ){
      temporaryData.setRole('Admin')
      this.userRole=temporaryData.getRole()
      console.log(this.userRole)
      this.adminId=dataService.userId;
    }
    ngOnInit():void{
      
    }

    changeAdminUsername(data:any){

      this.adminService.changeUsernameAdmin(data).subscribe({
        next:(result)=>{
          alert('Username Changed SuccessFully')
          console.log(result)
          this.router.navigateByUrl('/admin-dashboard')
        },
        error:(errorResponse:HttpErrorResponse)=>{
  
          console.log(errorResponse);
          
        }
      })
    }
}
