import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    templateUrl: 'forgot.password.component.html',
})
export class ForgotPasswordComponent implements OnInit {

    error: string = '';
    email: string = '';
    emailSent: boolean = false;
    submitted: boolean = false;
    theForm: FormGroup = new FormGroup({});

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
    ) {
    }

    ngOnInit(): void {
        this.theForm = this.formBuilder.group({
            email: ['', Validators.required],
        });
    }
    get f() { return this.theForm.controls; }

    onSubmit() {

         console.log(this.theForm)
        if (this.theForm.invalid) {
            return;
        }
        else {
            this.sendEmail();
        }
    }

    sendEmail() {
        this.submitted = true;
        this.error = '';
        this.accountService.forgotPassword(this.f['email'].value)
            .pipe(first())
            .subscribe(
                () => {
                    this.emailSent = true;
                },
                error => {
                    this.error = error;
                    this.emailSent = true;
                });
    }

    resendEmail() {
        this.email = '';
        this.submitted = false;
        this.emailSent = false;
    }

}
