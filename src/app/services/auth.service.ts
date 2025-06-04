import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // For making HTTP requests
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router: any;
  userSubject: any;

  // logout() {
  //   localStorage.removeItem('token');
  //   this.userSubject.next(null);
  //   this.router.navigate(['/login']);
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  private apiUrl = 'http://localhost:5000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Login response:', response); // 🛠️ Debugging log
  
        // Always save token
        if (response.token) {
          localStorage.setItem('token', response.token); // ✅ Save the token instead of userId
        } else {
          console.error('No token found in login response.');
        }
  
        // Always save user data (without userId now)
        if (response.user) {
          // Store other user information (no need for _id)
          if (response.user.name) {
            localStorage.setItem('userName', response.user.name);
          }
  
          if (response.user.email) {
            localStorage.setItem('userEmail', response.user.email);
          }
  
          // Handle profile picture
          if (response.user.profilePic) {
            localStorage.setItem(
              `profileImageUrl_${response.user.email}`,
              response.user.profilePic
            );
          } else if (response.user.email) {
            localStorage.removeItem(`profileImageUrl_${response.user.email}`);
          }
  
          // Update user observable (if you're using it)
          this.userSubject.next(response.user);
          
          // Redirect after successful login
          this.router.navigate(['/dashboard']);
        } else {
          console.error('No user object in login response.');
        }
      })
    );
}


  // Fetch user profile data
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return this.http.get(`${this.apiUrl}/api/profile/view`, {
      headers: { Authorization: `Bearer ${token}` }, // Send auth header with token
    });
  }

  // Method to request password reset
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth/forgot-password', {
      email,
    });
  }

  // Method to reset password
  resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<any> {
    // Pass the token in the URL as a route parameter
    return this.http.post(
      `http://localhost:5000/api/auth/reset-password/${token}`,
      { newPassword, confirmPassword }
    );
  }
}
