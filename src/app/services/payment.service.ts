import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
providedIn: 'root',
})
export class PaymentService {
private stripePromise: Promise<Stripe | null>;
private apiUrl = 'http://localhost:5000'; // backend URL

constructor(private http: HttpClient) {
this.stripePromise = loadStripe('pk_test_51R7EVwBDoREkssbBQXMk2xienwRQrAzZcQ100qOABqTLYQdgllLO5Z2bGZgcUZkvaVurM14CcLe1Iojyi4e9MmLW00mxULY9QD');
}
async checkout(selectedPlan: string = 'defaultPlan') {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage

    if (!token) {
        console.error('Token is missing.');
        return;
    }

    const stripe = await this.stripePromise;
    if (!stripe) {
        console.error('Stripe failed to load.');
        return;
    }

    console.log(`Processing payment for plan: ${selectedPlan}, token: ${token}`);

    this.http
        .post<{ id: string }>(`${this.apiUrl}/api/payments/create-checkout-session`, {
            // plan: selectedPlan,
            planType: selectedPlan,
            token: token,  // Send the token instead of userId
        })
        .subscribe(async (session) => {
            await stripe.redirectToCheckout({ sessionId: session.id });
        });
}

  
unlockPremium(token: string) {
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/api/user/unlock-premium`, {}, { headers });
}
}
