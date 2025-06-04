import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ProfileService } from './profilepic/profile.service';  // Import your ProfileService

@Component({
  selector: 'app-root',
  standalone: true,  // This is okay if you want a standalone component
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule, CommonModule], // Add HttpClientModule here
  template: ` 
    <router-outlet></router-outlet> <!-- Routed views will be displayed here -->
  `,


  providers: [ProfileService],  // Ensure ProfileService is provided
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

  
})
export class AppComponent {}
