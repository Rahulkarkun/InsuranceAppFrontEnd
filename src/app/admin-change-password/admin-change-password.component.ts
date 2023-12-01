import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent {
  userRole: string = '';
  changePasswordAdmin: FormGroup;
  adminId: number = 0;

  constructor(
    private adminService: AdminService,
    private dataService: DataService,
    private temporaryData: TemporaryDataService,
    private router: Router
  ) {
    // this.userRole = temporaryData.getRole();
    temporaryData.setRole('Admin')
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
    this.adminId = dataService.userId;
    console.log(this.adminId)

    this.changePasswordAdmin = new FormGroup({
      id: new FormControl(''),
      oldPassword: new FormControl(''),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, { validators:(control) => this.passwordMatchValidator(control) });
  }

  changeAdminPassword(data: any) {
    debugger
    this.adminService.changePasswordAdmin(data).subscribe({
      next: (result) => {
        alert('Password Changed Successfully');
        console.log(result);
        this.router.navigateByUrl('/admin-dashboard');
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  private passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
  }
}
