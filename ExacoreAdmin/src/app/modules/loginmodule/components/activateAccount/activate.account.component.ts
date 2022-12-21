import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
    templateUrl: 'activate.account.component.html',
})
export class ActivateAccountComponent implements OnInit, OnDestroy {

    sub: any;
    guid: string = '';
    email: string = '';
    error: string = '';
    activating: boolean = true;

    message: string = 'Activating your account please wait.';

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            this.guid = params['guid'];
            this.email = params['email'];
            if (this.guid == undefined || this.email == undefined) {
                this.error = "This page has expired. Request a new password reset link.";
            }
            this.activateAccount();
        });
    }

    activateAccount() {
        this.error = '';
        if (this.email == null || this.email == undefined || this.email.length == 0) {
            this.error = 'This page has expired. Please try logging in.';
            return;
        }
        else {
            this.accountService.activateAccount(this.email, this.guid)
                .pipe(first())
                .subscribe(
                    () => {
                        this.activating = false;
                    },
                    error => {
                        console.log(error)
                        this.error = error.error.message;
                        this.activating = true;
                    });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
