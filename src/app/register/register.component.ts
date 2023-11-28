// register.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  buttonColorClass: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      newUsername: ['', [Validators.required, Validators.minLength(3)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: (control) => this.passwordMatchValidator(control) });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    this.buttonColorClass = password === confirmPassword ? '' : 'disabled-button';

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Register Form Submitted:', this.registerForm.value);
      this.buttonColorClass = '';
      this.router.navigate(['/login']);
    } else {
      console.log('Invalid Form');
      this.buttonColorClass = 'disabled-button';
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}