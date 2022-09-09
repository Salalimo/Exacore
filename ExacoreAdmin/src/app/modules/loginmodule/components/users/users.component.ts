import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
    templateUrl: 'users.component.html',
})
export class UserComponent implements OnInit, OnDestroy {

    sub: any;
    guid: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    error: string = '';
    emailSent: boolean = false;
    submitted: boolean = false;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            this.guid = params['guid'];
            this.email = params['email'];
            console.log(this.guid, this.email)
            if (this.guid == undefined || this.email == undefined) {
                this.error = "This page has expired. Request a new password reset link.";
            }
        });
    }

    resetPassword() {
        this.error = '';
        console.log(this.guid, this.email)
        if (this.email == null || this.email == undefined || this.email.length == 0) {
            this.error = 'This page has expired. Please try logging in.';
            return;
        }
        else if (this.password != this.confirmPassword) {
            this.error = 'The passwords do no match';
            return;
        }
        else {

            this.accountService.resetPassword(this.email, this.guid, this.password)
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
