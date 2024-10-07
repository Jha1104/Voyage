import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  // Ensure ReactiveFormsModule is imported
import { ButtonModule } from 'primeng/button';         // PrimeNG Button Module
import { InputTextModule } from 'primeng/inputtext';   // PrimeNG InputText Module
import { CommonModule } from '@angular/common';        // Import CommonModule for basic Angular features

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,  // Ensure ReactiveFormsModule is part of imports for form handling
    CommonModule,         // Ensure CommonModule is imported for Angular directives like *ngIf
    ButtonModule,         // PrimeNG Button Module
    InputTextModule       // PrimeNG InputText Module
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  showSignupForm: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.usernameValidator()]],
      password: ['', [Validators.required, this.passwordValidator()]]
    });

    // Initialize the signup form
    this.signUpForm = this.fb.group({
      fullName: ['', Validators.required],
      signUpUsername: ['', Validators.required],
      signUpPassword: ['', [Validators.required, this.passwordValidator()]],
      retypePassword: ['', Validators.required],
      emailOrMobile: ['', Validators.required]
    });
  }

  // Username validator
  usernameValidator() {
    const emailOrPhonePattern = /(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)|(^\d{10}$)/;
    return (control: FormControl) => {
      const value = control.value || '';
      return emailOrPhonePattern.test(value) ? null : { invalidUsername: true };
    };
  }

  // Password validator
  passwordValidator() {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,10}$/;
    return (control: FormControl) => {
      const value = control.value || '';
      return passwordPattern.test(value) ? null : { invalidPassword: true };
    };
  }

  clearForm() {
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Form submitted:', this.loginForm.value);
    } else {
      console.log('Login Form is invalid');
    }
  }

  onSignUpSubmit() {
    if (this.signUpForm.valid) {
      console.log('SignUp form submitted:', this.signUpForm.value);
    } else {
      console.log('SignUp form is invalid');
    }
  }

  onSignUp() {
    this.showSignupForm = true;
  }
  cancelSignup() {
    this.showSignupForm = false;
  }
}
