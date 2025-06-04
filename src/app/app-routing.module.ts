import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SkinRecommendationsComponent } from './skin-recommendations/skin-recommendations.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'profile-page', component: DashboardComponent },
  { path: 'skin-recommendations', component: SkinRecommendationsComponent }, // Updated route
  { path: 'upload-pic', component: ImageUploadComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
