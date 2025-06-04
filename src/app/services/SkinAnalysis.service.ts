// skin-analysis.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SkinAnalysisService {
  constructor(private http: HttpClient) {}

  uploadSkinImage(file: File) {
    const apiUrl = 'http://localhost:5000'; // backend URL
    const formData = new FormData();
    console.log(file)
    const email: any =localStorage.getItem('userEmail')
    console.log(email)
    formData.append("email", email)
    formData.append('skinImage', file);
    console.log(formData)
    return this.http.post<any>(`${apiUrl}/api/upload/skin-analysis`, formData);
  }
}
