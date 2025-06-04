    import { Component } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';

    @Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
    })
    export class ForgotPasswordComponent {
    forgotPasswordForm: FormGroup;
    message = '';

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
        });
    }

    submitRequest() {
        if (this.forgotPasswordForm.valid) {
        this.http.post('http://localhost:5000/api/auth/forgot-password', this.forgotPasswordForm.value)
            .subscribe(
            (res: any) => this.message = res.message,
            (err) => this.message = 'Error: ' + err.error.message
            );
        }
    }
    }
