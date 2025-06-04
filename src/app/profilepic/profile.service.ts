    import { Injectable } from '@angular/core';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { Observable, throwError } from 'rxjs';



    @Injectable({
    providedIn: 'root'
    })
    export class ProfileService {

      getProfileImage() {
        throw new Error('Method not implemented.');
      }
      private apiUrl = 'http://localhost:5000/api/profile';  // Corrected the base URL
    
      constructor(private http: HttpClient) {}
    
      //Fetch user profile data including name, email, and profile picture
      getUserProfile(): Observable<any> {
        const token = localStorage.getItem('token');  // Get the token from localStorage
        return this.http.get(`${this.apiUrl}/view`, {
          headers: { Authorization: `Bearer ${token}` }  // Send the token in the header
        });
      }

      uploadProfilePic(file: File): Observable<any> {
        const formData = new FormData();
        // Ensure the key matches the backend expectation
        formData.append('image', file);
        const token = localStorage.getItem('token');
        return this.http.post(`${this.apiUrl}/upload-profile-pic`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      updateProfile(data: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.put(`${this.apiUrl}/update`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    }


    
  




