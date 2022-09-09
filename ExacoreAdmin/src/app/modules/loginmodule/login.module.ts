import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './layout/footer.component';
import { NavComponent } from './layout/nav.component';

import { LoginComponent } from './components/login.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgot.password.component';
import { ResetPasswordComponent } from './components/resetPassword/reset.password.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterationConfirmationComponent } from './components/registerationConfirmation/registeration.confirmation.component';
import { ActivateAccountComponent } from './components/activateAccount/activate.account.component';
import { ResendVerificationComponent } from './components/resendVerification/resend.verification.component';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent,
    NavComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    RegisterationConfirmationComponent,
    ActivateAccountComponent,
    ResendVerificationComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    SocialLoginModule,


  ],
  providers: [


    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1056649526179-7f75ahd28cc2ogm24ubvpgo8hg2e7d8s.apps.googleusercontent.com'
            )
          },
        ],
      } as SocialAuthServiceConfig
    }


  ],
  exports: [
    FooterComponent,
    NavComponent,
  ]
})
export class LoginModule { }
