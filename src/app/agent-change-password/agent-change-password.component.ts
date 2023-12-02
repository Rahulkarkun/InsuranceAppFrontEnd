import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../services/agent.service';
import { DataService } from '../services/data.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-agent-change-password',
  templateUrl: './agent-change-password.component.html',
  styleUrls: ['./agent-change-password.component.css']
})
export class AgentChangePasswordComponent {
  userRole: string = '';
  changePasswordAgent: FormGroup;
  agentId: number = 0;

  constructor(
    private agentService: AgentService,
    private dataService: DataService,
    private temporaryData: TemporaryDataService,
    private router: Router
  ) {
    this.userRole = temporaryData.getRole();
    console.log(this.userRole);
    this.agentId = dataService.userId;
    this.changePasswordAgent = new FormGroup({
      id: new FormControl(''),
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl('', Validators.required),
    },{ validators:(control) => this.passwordMatchValidator(control) });
  }

  changeAgentPassword(data: any) {
    this.agentService.changePasswordAgent(data).subscribe({
      next: (result) => {
        alert('Password Changed Successfully');
        console.log(result);
        this.router.navigateByUrl('/agent-dashboard');
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