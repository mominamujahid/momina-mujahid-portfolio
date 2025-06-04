import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profilepic/profile.service'; // Adjust path as needed
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profileImageUrl: string | null = null;
  showEditModal: boolean = false;
  showChangePasswordModal: boolean = false;
  profileForm: FormGroup;
  skinType: string = 'Pic Not Uploaded';
  skinConcerns: string = 'Pic Not Uploaded'
  changePasswordForm: FormGroup;
    userName: any;
    userEmail: any;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar  

  ) {
    // Initialize the profile form with default values
    this.profileForm = this.fb.group({
      fullName: [' '],
      //dateOfBirth: ['2003-01-21'],
      //location: ['Gujrat, Pakistan'],
      language: ['english_uk'],
      email: [' '],
      //phoneNumber: ['+92 XXX XXX XXXX'],
      skinType: ['Dry'],
      sensitivity: ['low'],
      skinConcerns: this.fb.group({
        acne: [true],
        hyperpigmentation: [false],
        wrinkles: [false],
        dryness: [false],
        redness: [false]
      })
    });
    // Initialize change password form with required validators
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

 //any logic 
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'Guest';
    this.userEmail = localStorage.getItem('userEmail') || 'Not available';
    this.skinType = sessionStorage.getItem('skin-type') || 'Pic Not Uploaded';
    const issues = sessionStorage.getItem('skin-issue');
    this.skinConcerns = issues && issues.trim().length > 0 ? issues : 'Pic Not Uploaded';

    // Update profile form with dynamic values
    this.profileForm.patchValue({
      fullName: this.userName,
      email: this.userEmail

    });
  
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
//Select File
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileService.uploadProfilePic(file).subscribe({
        next: (response) => {
          if (response.imageUrl) {
            this.profileImageUrl = response.imageUrl;
            localStorage.setItem('profileImageUrl', response.imageUrl);
          }
        },
        error: (err) => {
          console.error('Upload failed:', err);
        }
      });
    }
  }

  // Modal methods for Edit Profile
  openEditModal(): void {
    this.showEditModal = true;
  }
  closeEditModal(): void {
    this.showEditModal = false;
  }

  //save profile
  saveProfile(): void {
    if (this.profileForm.valid) {
      const updatedName = this.profileForm.value.fullName;
  
      this.profileService.updateProfile({ name: updatedName }).subscribe({
        next: (response) => {
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          localStorage.setItem('userName', updatedName);
          this.userName = updatedName;
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Failed to update profile:', err);
          this.snackBar.open('Failed to update profile.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
    } else {
      console.error('Profile form is invalid');
    }
  }
  


  // Modal methods for Change Password
  openChangePasswordModal(): void {
    this.showChangePasswordModal = true;
  }
  closeChangePasswordModal(): void {
    this.showChangePasswordModal = false;
  }

//change password
submitChangePassword(): void {
  if (this.changePasswordForm.valid) {
    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    if (newPassword !== confirmPassword) {
      this.snackBar.open('New Password and Confirm Password do not match.', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }

    const updateData = { currentPassword, newPassword, confirmPassword };

    this.profileService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.snackBar.open('Password updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.closeChangePasswordModal();
        this.changePasswordForm.reset();
      },
      error: (err) => {
        console.error('Failed to change password:', err);
        this.snackBar.open(err?.error?.message || 'Failed to change password. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  } else {
    console.error('Change password form is invalid');
  }
}
}