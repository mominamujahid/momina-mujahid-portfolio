import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage = '';
  successMessage = '';

  showPassword: boolean = false; // 👁️ Added here

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const loginData = this.loginForm.value;

    this.http.post<{ token: string; user: { email: string; name: string; _id: string } }>(
      'http://localhost:5000/api/auth/login',
      loginData,
      { headers: { 'Content-Type': 'application/json' } }
    ).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.user?.name || 'User');
          localStorage.setItem('userEmail', response.user.email);
          localStorage.setItem('userId', response.user._id);
          localStorage.setItem('lastLoginDate', new Date().toDateString());

          this.updateRoutineStreak(); // Call the streak function

          this.successMessage = 'Login successful!';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          this.errorMessage = 'Login failed: No token received.';
        }
      },
      error: (error) => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }

        this.loading = false;

        // Clear error after 3 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
    });
  }

  updateRoutineStreak() {
    const today = new Date();
    const todayDate = today.toDateString();

    const lastLoginDate = localStorage.getItem('lastLoginDate');
    let routineStreak = Number(localStorage.getItem('routineStreak') || 0);

    if (lastLoginDate) {
      const lastDate = new Date(lastLoginDate);
      const differenceInTime = today.getTime() - lastDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays === 1) {
        routineStreak += 1;
      } else if (differenceInDays > 1) {
        routineStreak = 1;
      }
    } else {
      routineStreak = 1;
    }

    localStorage.setItem('lastLoginDate', todayDate);
    localStorage.setItem('routineStreak', routineStreak.toString());
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
