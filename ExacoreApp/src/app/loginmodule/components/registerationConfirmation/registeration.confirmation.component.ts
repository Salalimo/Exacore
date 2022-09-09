import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'registeration.confirmation.component.html',
})
export class RegisterationConfirmationComponent implements OnInit, OnDestroy {

    sub: any;
    email: string = '';
    error: string = '';
    emailSent: boolean = false;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,

    ) {

    }

    ngOnInit() {

        this.sub = this.route.queryParams.subscribe(params => {
            this.email = params['email'];
        });
    }

    resendVerification() {
        this.error = '';
        if (this.email == null || this.email == undefined || this.email.length == 0) {
            this.error = 'This page has expired. Please try logging in.';
            return;
        }
        this.accountService.resendVerification(this.email)
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
