import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';  // Ensure ReactiveFormsModule is imported
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
  styleUrls: ['./login.component.scss']
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

    // Initialize the signup form with the password match validator
    this.signUpForm = this.fb.group({
      fullName: ['', [Validators.required, this.fullNameValidator()]],
      signUpUsername: ['', [Validators.required, this.usernameValidator()]],
      signUpPassword: ['', [Validators.required, this.passwordValidator()]],
      retypePassword: ['', Validators.required],
      emailOrMobile: ['', [Validators.required, this.emailOrMobileValidator()]]
    }, {
      validators: this.passwordMatchValidator // Add password match validator to the whole form
    });
  }

  // Full name validator: Only letters allowed
  fullNameValidator() {
    return (control: FormControl): ValidationErrors | null => {
      const fullNamePattern = /^[a-zA-Z\s]+$/;
      return fullNamePattern.test(control.value) ? null : { invalidFullName: true };
    };
  }

  // Username validator: Allow letters, numbers, and characters
  usernameValidator() {
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    return (control: FormControl): ValidationErrors | null => {
      return usernamePattern.test(control.value) ? null : { invalidUsername: true };
    };
  }

  // Password validator: 1 capital, 1 small, 1 special character, 1 number, length 10
  passwordValidator() {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,}$/;
    return (control: FormControl): ValidationErrors | null => {
      return passwordPattern.test(control.value) ? null : { invalidPassword: true };
    };
  }

  // Email or mobile validator: Either a 10-digit number or valid email
  emailOrMobileValidator() {
    const emailOrMobilePattern = /(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)|(^\d{10}$)/;
    return (control: FormControl): ValidationErrors | null => {
      return emailOrMobilePattern.test(control.value) ? null : { invalidEmailOrMobile: true };
    };
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('signUpPassword')?.value;
    const retypePassword = control.get('retypePassword')?.value;
    return password === retypePassword ? null : { passwordMismatch: true };
  }

  // Reset form on cancel
  clearForm() {
    this.loginForm.reset();
  }

  // Handle login form submit
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Form submitted:', this.loginForm.value);
    } else {
      console.log('Login Form is invalid');
    }
  }

  // Handle signup form submit
  onSignUpSubmit() {
    if (this.signUpForm.valid) {
      console.log('SignUp form submitted:', this.signUpForm.value);
    } else {
      console.log('SignUp form is invalid');
    }
  }

  // Toggle signup form visibility
  onSignUp() {
    this.showSignupForm = true;
  }

  // Hide signup form on cancel
  cancelSignup() {
    this.showSignupForm = false;
    this.signUpForm.reset();
  }
}
