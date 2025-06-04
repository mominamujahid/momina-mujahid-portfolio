//payment.component.ts
import { Component } from "@angular/core";
import { PaymentService } from "../services/payment.service";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
    // template: `<button (click)="pay()">Unlock Premium</button>`,
})

export class PaymentComponent {
    // constructor(private paymentService: PaymentService) {}

    // pay() {
    //     const selectedPlan = "premium";  // Set or get this value dynamically
    //     this.paymentService.checkout(selectedPlan);
    // }
    selectedPlan: 'monthly' | 'yearly' = 'monthly'; // Default

    constructor(private paymentService: PaymentService) {}
  
    selectPlan(plan: 'monthly' | 'yearly') {
      this.selectedPlan = plan;
    }
  
    pay() {
      this.paymentService.checkout(this.selectedPlan);
    }

}
