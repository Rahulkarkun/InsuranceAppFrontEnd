import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DataService } from '../services/data.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-change-username',
  templateUrl: './employee-change-username.component.html',
  styleUrl: './employee-change-username.component.css'
})
export class EmployeeChangeUsernameComponent {
  employeeData:any
  userRole:string='';
  changeUsernameEmployee = new FormGroup({
    id:new FormControl(''),
    oldUsername: new FormControl(''),
    newUsername:new FormControl('')
  })

  employeeId:number=0;

  constructor(
    private employeeService:EmployeeService,
    private dataService: DataService,
    private temporaryData:TemporaryDataService,
    private router:Router
    ){
      this.userRole=temporaryData.getRole()
      console.log(this.userRole)
      this.employeeId=dataService.userId;
    }

    changeEmployeeUsername(data:any){

      this.employeeService.changeUsernameEmployee(data).subscribe({
        next:(result)=>{
          alert('Username Changed SuccessFully')
          console.log(result)
          this.router.navigateByUrl('/employee-dashboard')
        },
        error:(errorResponse:HttpErrorResponse)=>{
          console.log(errorResponse);
          
        }
      })
    }
}