import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule, CommonModule] // Ensure FormsModule is included
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  invalidEmail: boolean = false;
  showPassword: boolean = false; // Track password visibility
  isSubmitting: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  // Toggle Password Visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Email Validation
  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.invalidEmail = !emailPattern.test(this.email);

    if (!this.invalidEmail) {
      const domainPart = this.email.split('@')[1]; // Extract domain
      const [domainName, topLevelDomain] = domainPart?.split('.') || []; // Split domain and TLD

      // Ensure domain name is not fully numeric & TLD is not numeric
      if (!domainName || !topLevelDomain || /^\d+$/.test(domainName) || /^\d+$/.test(topLevelDomain)) {
        this.invalidEmail = true;
      }
    }
  }

  // Signup Function
  signup(signupForm: NgForm) {
    // Clear previous messages before validation
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.invalidEmail) {
      this.errorMessage = 'Enter a valid email';
      return;
    }
    
    // Prevent double submission
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Send Signup Request
    this.http.post('http://localhost:5000/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.successMessage = 'Signup successful!';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);
        }, 2000);
        signupForm.reset();
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'An error occurred';
        setTimeout(() => this.errorMessage = '', 1000);
      },
      complete: () => {
        // Reset flag after request is completed
        this.isSubmitting = false;
      }
    });
  }
}
