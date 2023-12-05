import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DataService } from '../services/data.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrl: './employee-change-password.component.css'
})
export class EmployeeChangePasswordComponent {
  employeeData:any
  userRole:string='';
  changePasswordEmployee :FormGroup

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

      this.changePasswordEmployee = new FormGroup({
        id: new FormControl(''),
        oldPassword: new FormControl(''),
        newPassword: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      }, { validators:(control) => this.passwordMatchValidator(control) });
    }
    changeEmployeePassword(data:any){

      this.employeeService.changePasswordEmployee(data).subscribe({
        next:(result)=>{
          alert('Password Changed SuccessFully')
          console.log(result)
          this.router.navigateByUrl('/employee-dashboard')
        },
        error:(errorResponse:HttpErrorResponse)=>{
  
          console.log(errorResponse);
          
        }
      })
    }
    private passwordMatchValidator(control: AbstractControl) {
      const newPassword = control.get('newPassword')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
  
      return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
    }
}