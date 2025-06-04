    import { Component, OnInit } from "@angular/core";
    import { ActivatedRoute, Router } from "@angular/router";

    @Component({
    selector: "app-payment-failure",
    templateUrl: "./payment-failure.component.html",
    styleUrls: ["./payment-failure.component.css"],
    })
    export class PaymentFailureComponent implements OnInit {
    errorMessage: string = "Your payment could not be processed. Please try again.";

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        // Check if there's an error message from Stripe (optional)
        const error = this.route.snapshot.queryParamMap.get("error");
        if (error) {
        this.errorMessage = `Payment failed: ${decodeURIComponent(error)}`;
        }
    }

    retryPayment() {
        this.router.navigate(["/payment"]); // Redirect user to pricing page to try again
    }
    }
