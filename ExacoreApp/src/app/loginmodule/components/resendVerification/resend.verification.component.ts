import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
    templateUrl: 'resend.verification.component.html',
})
export class ResendVerificationComponent implements OnInit, OnDestroy {

    sub: any;
    email: string = '';
    error: string = '';
    emailSent: boolean = false;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            this.email = params['email'];
            if (this.email == undefined) {
                this.error = "This page has expired. Request a new password reset link.";
            }
        });
    }

    resendVerification() {
        this.error = '';
        if (this.email == null || this.email == undefined || this.email.length == 0) {
            this.error = 'This page has expired. Please try logging in.';
            return;
        }
        else {

            this.accountService.resendVerification(this.email)
                .pipe(first())
                .subscribe(
                    () => {
                        this.emailSent = true;
                    },
                    error => {
                        console.log(error)
                        this.error = error.error.message;
                        console.log(this.error)
                        this.emailSent = true;
                    });
        }

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
