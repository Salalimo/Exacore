import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: 'reset.password.component.html',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    sub: any;
    guid: string = '';
    email: string = '';
    error: string = '';
    emailSent: boolean = false;
    submitted: boolean = false;
    theForm: FormGroup = new FormGroup({});

    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.theForm = this.formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });

        this.sub = this.route.queryParams.subscribe(params => {
            this.guid = params['guid'];
            this.email = params['email'];
            if (this.guid == undefined || this.email == undefined) {
                this.error = "This page has expired. Request a new password reset link.";
            }
        });
    }

    get f() { return this.theForm.controls; }

    onSubmit() {

        if (this.theForm.invalid) {
            return;
        }
        this.resetPassword();
    }

    resetPassword() {
        this.submitted = true;
        this.error = '';
        if (this.email == null || this.email == undefined || this.email.length == 0) {
            this.error = 'This page has expired. Please try logging in.';
            return;
        }

        else if (this.f['password'].value != this.f['confirmPassword'].value) {
            this.error = 'The passwords do no match';
            return;
        }
        else {

            this.accountService.resetPassword(this.email, this.guid, this.f['password'].value )
                .pipe(first())
                .subscribe(
                    () => {
                        this.emailSent = true;
                    },
                    error => {
                        console.log(error.error.message)
                        this.error = error.error.message;
                        this.emailSent = false;
                    });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
