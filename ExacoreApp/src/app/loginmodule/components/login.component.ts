import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
// import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
// import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({});
    loading = false;
    submitted = false;
    returnUrl: string = '';
    error: string = '';

    //user?: SocialUser;
    hasApiAccess = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        //private socialAuthService: SocialAuthService,
        private httpClient: HttpClient
    ) {
    }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

        // this.socialAuthService.authState.subscribe((user) => {
        //     if (user) {
        //         this.httpClient.post<any>(environment.apiUrl + 'api/login/authenticate', { idToken: user.idToken, accessToken: user.response.access_token })
        //             .subscribe({
        //                 next: (authToken: any) => {
        //                     console.log(authToken);
        //                     let reqHeader = new HttpHeaders({
        //                         'Content-Type': 'application/json',
        //                         'Authorization': 'Bearer ' + authToken.authToken
        //                     });
        //                    this.router.navigateByUrl('dashboard');
        //                 },
        //                 error: (error) => {
        //                     console.log(error)
        //                     if (error != undefined)
        //                         this.error = error.error.message;

        //                     if (this.error == "Inactive User") {
        //                         this.router.navigateByUrl('resendverification?email=' + this.f['email'].value);
        //                         return;
        //                     }
        //                     this.loading = false;
        //                 }
        //             });
        //     }
        //     this.user = user;
        // })
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {

        this.error = '';
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f['email'].value, this.f['password'].value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                },
                error => {
                    console.log(error)
                    if (error != undefined)
                        this.error = error.error.message;

                    if (this.error == "Inactive User") {
                        this.router.navigateByUrl('resendverification?email=' + this.f['email'].value);
                        return;
                    }
                    this.loading = false;
                });
    }

    signup() {
        this.router.navigateByUrl('register');
    }

    externalLogin() {
        console.log(11)
        //return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
}
