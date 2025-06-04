<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { FormsModule } from '@angular/forms';
import {  provideHttpClient, withFetch } from '@angular/common/http'; // Import withFetch
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { ProfileService } from './profilepic/profile.service';  // Adjust the path as necessary
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { HttpClientModule } from '@angular/common/http'; 
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SkinRecommendationsComponent } from './skin-recommendations/skin-recommendations.component'; // Updated import



export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'payment' , component: PaymentComponent } ,
  { path: 'chatbot' , component: ChatbotComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  {path: 'payment' , component:PaymentComponent},
  { path: 'payment-success', component: PaymentSuccessComponent},
  { path: 'payment-failure', component: PaymentFailureComponent},
  { path: 'upload-pic', component: ImageUploadComponent },
  { path: 'skin-recommendations', component: SkinRecommendationsComponent }, // Updated route
  { path: '**', redirectTo: '' } // Wildcard route at the end


];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule, HttpClientModule ,FormsModule, ReactiveFormsModule,BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    ImageUploadComponent,
    SkinRecommendationsComponent ,// Added to imports as standalone component

  AppComponent],
  declarations: [LoginComponent, ProfilePageComponent,ForgotPasswordComponent,  ResetPasswordComponent],
  exports: [RouterModule],
  providers: [ 
    provideHttpClient(withFetch()) ,ProfileService],// Enable fetch API for HttpClient],
})
export class AppRoutingModule {}
=======


import {  Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';


export const routes: Routes = [  
{ path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
];


>>>>>>> 2c8a7784cb0f46b2d9354c9a12d751db40e8dccf
