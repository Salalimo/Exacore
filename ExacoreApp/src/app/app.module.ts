import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './loginmodule/interceptors/jwt.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginModule } from './loginmodule/login.module';
import { ExFormsModule } from './forms/forms.module';


import {
  DivisionClient, DepartmentClient, ProjectClient, GoodCatchTypeClient, ControlMethodClient, AlertTimeClient,
  GoodCatchClient, JsaClient, ToolboxMeetingClient, MotorizedEquipmentClient, IncidentAlertClient,
  NearMissClient, SiteSafetyOrientationClient
} from './services/api.service';

//addmoduleimport


@NgModule({
  declarations:
    [
      AppComponent
    ],
  entryComponents: [],
  imports:
    [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,

      LoginModule,
      ExFormsModule,
      //EntityModule

    ],
  providers:
    [
      
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      DivisionClient, DepartmentClient, ProjectClient, GoodCatchTypeClient, ControlMethodClient, AlertTimeClient,
      GoodCatchClient, JsaClient, ToolboxMeetingClient, MotorizedEquipmentClient, IncidentAlertClient,
      NearMissClient, SiteSafetyOrientationClient

    ],

  bootstrap: [AppComponent],
})
export class AppModule { }
