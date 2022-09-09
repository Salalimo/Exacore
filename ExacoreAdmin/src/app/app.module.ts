import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './modules/loginmodule/interceptors/jwt.interceptor';
//import { ErrorInterceptor } from './modules/loginmodule/interceptors/error.interceptor';


import { AppRoutingModule } from './app-routing.module';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { MaterialModule } from './shared/material.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { LoginModule } from './modules/loginmodule/login.module';
import { AdminModule } from './modules/adminmodule/admin.module';
import { LookupsModule } from './modules/lookupsmodule/lookups.module';
import { ExFormsModule } from './modules/formsmodule/exforms.module';

import {
  AlertTimeClient, ControlMethodClient, DepartmentClient, DivisionClient, GoodCatchTypeClient,
  NearMissTypeClient, ProjectClient,
  FormClient, GoodCatchClient, IncidentAlertClient, JsaClient, MotorizedEquipmentClient,
  NearMissClient, SiteSafetyOrientationClient, ToolboxMeetingClient

} from './services/api.service';

import { AccountClient, UserClient } from './services/api.service';

import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { MainSMComponent } from './main-sm.component';
import { FormsMainComponent } from './formsmain.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DeleteModalComponent } from './shared/modals/delete.modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormsMainComponent,
    DashboardComponent,
    MainSMComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    SocialLoginModule,
    ToastrModule.forRoot(),
    LoadingBarHttpClientModule,
    LoadingBarModule,

    //MaterialModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,

    LoginModule,
    LookupsModule,
    AdminModule,
    ExFormsModule,

  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '362693061589-kiivhaha3sgmvqte73dqur0rlktf08ts.apps.googleusercontent.com',
            )
          },
        ],
      } as SocialAuthServiceConfig
    },

    AlertTimeClient, ControlMethodClient, DepartmentClient, DivisionClient, GoodCatchTypeClient,
    NearMissTypeClient, ProjectClient,
    AccountClient, UserClient,
    FormClient, GoodCatchClient, IncidentAlertClient, JsaClient, MotorizedEquipmentClient,
    NearMissClient, SiteSafetyOrientationClient, ToolboxMeetingClient

  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteModalComponent]

})
export class AppModule { }
