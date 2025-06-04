// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profilepic/profile.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // User profile & notifications
  profileImageUrl: string | null = null;
  userName: string = ' ';
  userEmail: string = ' ';
  notificationCount: number = 3;
  
  // Skin health data
  skinHealthScore: number = 78;
  
  // // Routine streak data
  // routineStreak: number = 14;
  // lastSevenDays: any[] = [
  //   { label: 'M', completed: true },
  //   { label: 'T', completed: true },
  //   { label: 'W', completed: true },
  //   { label: 'T', completed: true },
  //   { label: 'F', completed: true },
  //   { label: 'S', completed: true },

  //   { label: 'S', completed: true }
  // ];

  routineStreak: number = 0;
  lastSevenDays: any[] = [];

  loadRoutineStreak(): void {
    const storedStreak = parseInt(localStorage.getItem('routineStreak') || '0', 10);
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();
  
    if (lastLoginDate !== today) {
      this.routineStreak = storedStreak + 1;
      localStorage.setItem('routineStreak', this.routineStreak.toString());
      localStorage.setItem('lastLoginDate', today);
  
      // Track login date for weekly calendar
      const history = JSON.parse(localStorage.getItem('loginHistory') || '[]');
      if (!history.includes(today)) {
        history.push(today);
        localStorage.setItem('loginHistory', JSON.stringify(history));
      }
    } else {
      this.routineStreak = storedStreak;
    }
  
    // Update calendar based on login history
    this.generateStreakCalendar();
  
    // Avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.skinHealthScore = this.calculateSkinHealthScore();
      this.cdr.detectChanges();
    });
  }
  

  generateStreakCalendar(): void {
    const today = new Date();
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const calendar: any[] = [];
  
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
    // Start from Sunday of the current week
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
  
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(sunday);
      currentDay.setDate(sunday.getDate() + i);
  
      const dayLabel = weekDays[i];
      const currentDayStr = currentDay.toDateString();
  
      const completed = lastLoginDate === currentDayStr;
      const isToday = currentDayStr === today.toDateString();
  
      calendar.push({
        label: dayLabel,
        completed: completed,
        isToday: isToday
      });
    }
  
    this.lastSevenDays = calendar;
  }
  

  calculateSkinHealthScore(): number {
    const cappedStreak = Math.min(this.routineStreak, 7);
    return cappedStreak * 14;
  }
// Determine skin health status based on score
  getSkinHealthStatus(): string {
    if (this.skinHealthScore >= 80) {
      return 'excellent';
    } else if (this.skinHealthScore >= 60) {
      return 'good';
    } else if (this.skinHealthScore >= 40) {
      return 'fair';
    } else {
      return 'needs attention';
    }
  }


  
  // Product data
  activeProducts: any[] = [
    { name: 'Hydrating Serum', category: 'Serum', icon: 'opacity', color: '#9c27b0' },
    { name: 'Vitamin C Cream', category: 'Moisturizer', icon: 'wb_sunny', color: '#e91e63' },
    { name: 'Gentle Cleanser', category: 'Cleanser', icon: 'spa', color: '#3f51b5' },
    { name: 'Niacinamide Toner', category: 'Toner', icon: 'water_drop', color: '#2196f3' }
  ];
  
  // Skin insights data
  selectedTimeframe: string = 'week';
  hydrationData: number[] = [45, 46, 50, 52, 54, 60, 62, 65];
  
  // Top products data
  topProducts: any[] = [
    { name: 'Hydrating Serum', category: 'Serum', impact: 32, icon: 'opacity', color: '#9c27b0' },
    { name: 'Vitamin C Cream', category: 'Moisturizer', impact: 28, icon: 'wb_sunny', color: '#e91e63' },
    { name: 'Gentle Cleanser', category: 'Cleanser', impact: 18, icon: 'spa', color: '#3f51b5' }
  ];
  
  // Recommendations data
  recommendations: any[] = [
    {
      name: 'Hyaluronic Acid Moisturizer',
      category: 'Moisturizer',
      image: 'assets/images/product1.jpg',
      badge: 'New',
      matchPercentage: 92,
      description: 'This deeply hydrating moisturizer is perfect for your combination skin and will help with your dryness concerns.'
    },
    {
      name: 'Niacinamide 10% Serum',
      category: 'Serum',
      image: 'assets/images/product2.jpeg',
      badge: null,
      matchPercentage: 87,
      description: 'Targets uneven skin tone and helps reduce the appearance of enlarged pores and blemishes.'
    },
    {
      name: 'Gentle Exfoliating Toner',
      category: 'Toner',
      image: 'assets/images/product3.jpg',
      badge: 'Popular',
      matchPercentage: 85,
      description: 'This gentle exfoliating toner removes dead skin cells to reveal brighter, smoother skin.'
    }
  ];
  
  // Skin logs data
  recentLogs: any[] = [
    {
      date: new Date('2025-04-05'),
      rating: 4,
      title: 'Skin feeling hydrated',
      description: 'My skin feels much more hydrated after consistently using the new serum for a week. Noticed reduced tightness after cleansing.',
      tags: ['Hydration', 'Improvement'],
      photoCount: 2
    },
    {
      date: new Date('2025-04-02'),
      rating: 3,
      title: 'Slight irritation',
      description: 'Experienced some redness after trying the new exfoliant. Will reduce frequency to once a week instead of twice.',
      tags: ['Sensitivity', 'Exfoliation'],
      photoCount: 1
    },
    {
      date: new Date('2025-03-30'),
      rating: 5,
      title: 'Best skin day in months!',
      description: 'Skin looks clear and glowing today! The new routine seems to be working well. Less breakouts and more even tone.',
      tags: ['Glowing', 'Clear skin'],
      photoCount: 3
    }
  ];

  // File upload properties
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  message: string = '';
  messageColor: string = 'black';
  

  constructor(private router: Router, private profileService: ProfileService, private cdr: ChangeDetectorRef) { }


//onit logic
  ngOnInit(): void {
    this.loadRoutineStreak();
    this.userName = localStorage.getItem('userName') || 'Guest';
    this.userEmail = localStorage.getItem('userEmail') || 'Not available';
    // ✅ Load profile image specific to logged-in user
    const storedImage = localStorage.getItem(`profileImageUrl_${this.userEmail}`);
    this.profileImageUrl = storedImage ? storedImage : 'assets/images/ppic.jpg';
  
    // 🔄 Update image from backend (and update that key again)
    this.profileService.getUserProfile().subscribe({
      next: (response) => {
        if (response.profilePic) {
          this.profileImageUrl = response.profilePic;
          localStorage.setItem(`profileImageUrl_${this.userEmail}`, response.profilePic);
        }
      },
      error: (err) => {
        console.error("Error fetching user profile:", err);
      }
    });
  }


  //File selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
    //new
    this.uploadFile();
  }

  // Trigger file input click
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    if (fileInput) {
      fileInput.click();
    }
  }
//upload file
  uploadFile(): void {
    if (this.selectedFile) {
      this.profileService.uploadProfilePic(this.selectedFile).subscribe({
        next: (response) => {
          this.message = 'Profile picture uploaded successfully!';
          this.messageColor = 'green';
  
          // ✅ Update profile image in UI and localStorage
          this.profileImageUrl = response.imageUrl;
          localStorage.setItem(`profileImageUrl_${this.userEmail}`, response.imageUrl);
        },
        error: (err) => {
          console.error('Upload failed:', err);
          this.message = `Upload failed: ${err.error?.message || err.statusText}`;
          this.messageColor = 'red';
        }
      });
    } else {
      this.message = 'No file selected!';
      this.messageColor = 'red';
    }
  }
  

  // Change timeframe for hydration data
  changeTimeframe(timeframe: string): void {
    this.selectedTimeframe = timeframe;
    if (timeframe === 'week') {
      this.hydrationData = [45, 46, 50, 52, 54, 60, 62, 65];
    } else if (timeframe === 'month') {
      this.hydrationData = [40, 42, 45, 48, 52, 55, 58, 65];
    } else {
      this.hydrationData = [30, 35, 42, 48, 55, 60, 63, 65];
    }
  }

  // Determine skin health status based on score

  
  //We read the routine streak from localStorage.
//This tells us how many consecutive days the user has been active with their skincare.
//Even if someone has a 20-day streak, we only count up to 7.
//Why? Because we’re calculating health weekly (7 days = 1 full week).
//Each day gives 14 points.
//So:
//1 day = 14 points
//2 days = 28 points so on 
//7 days = 98 points (nearly perfect!)
//This gives a nice, easy-to-understand number close to 100.
//We use the score to tell the user how healthy their skin is, based on how consistent they’ve been:
//If you take care of your skin every day, your health score goes up. But if you skip, it drops. And I’ll tell you how you’re doing based on that


  // Logout action
  logout(): void {
    // Implement logout logic here (e.g., clear tokens, etc.)
    this.router.navigate(['/login']);
  }
}