    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, Router } from '@angular/router';
    import { HttpClient } from '@angular/common/http';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';

    @Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
    })
    export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    token: string = '';
    message = '';
    passwordMismatch: boolean = false;  // Flag for password mismatch error

    constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
        this.resetPasswordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
        });

        this.token = this.route.snapshot.paramMap.get('token') || '';
    }

    ngOnInit() {}

    resetPassword() {
        const newPassword = this.resetPasswordForm.value.newPassword;
        const confirmPassword = this.resetPasswordForm.value.confirmPassword;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
        this.passwordMismatch = true;
        return;
        }

        this.passwordMismatch = false;

        // Send request to backend
        if (this.resetPasswordForm.valid) {
        this.http.post(`http://localhost:5000/api/auth/reset-password/${this.token}`, { newPassword , confirmPassword})
            .subscribe(
            (res: any) => {
                this.message = res.message;
                setTimeout(() => this.router.navigate(['/login']), 3000);
            },
            (err) => this.message = 'Error: ' + err.error.message
            );
        }
    }
    }
