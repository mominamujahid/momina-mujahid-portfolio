import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserService } from '../services/browser.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  successMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private browserService: BrowserService
  ) {}

  ngOnInit(): void {
    if (this.browserService.isBrowser()) {
      this.unlockPremiumFeatures();
    } else {
      console.log('SSR rendering — skipping localStorage usage.');
    }
  }

  unlockPremiumFeatures() {
    const token = this.browserService.getLocalStorageItem('token');

    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    this.http.post('http://localhost:5000/api/user/unlock-premium', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe(
      response => {
        console.log('Premium features unlocked!', response);
        this.successMessage = 'Premium features unlocked successfully!';
        setTimeout(() => {
          this.router.navigate(['/chatbot']);
        }, 1500);
      },
      error => {
        console.error('Error unlocking premium features:', error);
      }
    );
  }
}
