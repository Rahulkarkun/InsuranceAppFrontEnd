import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  myToken:any;
  role:any;
  user:any;
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private auth: LoginService,
    private data: DataService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const formData = {
        userName: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value
      };

      this.auth.login(formData).subscribe({
        next: (response) => {
          this.myToken = response.headers.get('jwt');
          this.myToken=JSON.parse(this.myToken)
          console.log(this.myToken);
        
          localStorage.setItem('token', this.myToken);
          this.user = response.body;
          this.data.userId=this.user.userId
          
          console.log(this.data.userId)
          this.data.userName=this.user.userName
          // Check if 'user' is not null or undefined before accessing properties
          //debugger
          if (this.user.roleName == 'Admin') {
            this.router.navigateByUrl('/admin-dashboard');
          }else if(this.user.roleName == 'Employee') {
            this.router.navigateByUrl('/employee-dashboard');
          }
          else if(this.user.roleName == 'Agent') {
            this.router.navigateByUrl('/agent');
          }
           else {
            this.router.navigateByUrl('/customer');
          }
        },
        
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          // Handle login error, show error messages, or take appropriate action
        }
      });
    } else {
      // Form is invalid, show error messages or take appropriate action
      console.log('Invalid Form');
    }
  }

  navigateToRegister() {
    // Navigate to register page
    this.router.navigate(['/register']);
  }
}
