import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrl: './admin-change-password.component.css'
})


export class AdminChangePasswordComponent {
  adminData:any
  userRole:string='';
  changePasswordAdmin = new FormGroup({
    id:new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword:new FormControl('')
  })

  adminId:number=0;

  constructor(
    
    private adminService:AdminService,
    private dataService: DataService,
    private temporaryData:TemporaryDataService,
    private router:Router
    ){
      this.userRole=temporaryData.getRole()
      console.log(this.userRole)
      this.adminId=dataService.userId;
    }

    // ngOnInit():void{
    //   // debugger
    //   var token=localStorage.getItem('token')
      
    //   var role = localStorage.getItem('role')
    //   if(token==null){
    //     alert('Please login')
    //     this.router.navigateByUrl('/login')
    //   }
    //   else if(role!='Admin'){
    //     alert('Please Login As Admin')
    //     this.router.navigateByUrl('/login')
    //   }
    // }

    changeAdminPassword(data:any){

      this.adminService.changePasswordAdmin(data).subscribe({
        next:(result)=>{
          alert('Password Changed SuccessFully')
          console.log(result)
          this.router.navigateByUrl('/admin-dashboard')
        },
        error:(errorResponse:HttpErrorResponse)=>{
  
          console.log(errorResponse);
          
        }
      })
    }

}
