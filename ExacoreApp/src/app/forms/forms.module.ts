import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { GoodCatchModule } from './goodcatch/goodcatch.module';
import { IncidentAlertModule } from './incidentalert/incidentalert.module';
import { JsaModule } from './jsa/jsa.module';
import { MotorizedEquipmentModule } from './motorizedequipment/motorizedequipment.module';
import { NearMissModule } from './nearmiss/nearmiss.module';
import { SiteSafetyOrientationModule } from './sitesafetyorientation/sitesafetyorientation.module';
import { ToolboxMeetingModule } from './toolboxmeeting/toolboxmeeting.module';
//addimport

import {
  DivisionClient, DepartmentClient, ProjectClient, GoodCatchTypeClient, ControlMethodClient, AlertTimeClient,
  GoodCatchClient, JsaClient, ToolboxMeetingClient, MotorizedEquipmentClient, IncidentAlertClient,
  NearMissClient, SiteSafetyOrientationClient, NearMissTypeClient
} from '../services/api.service';



@NgModule({
  declarations: [

    
    //addcomponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    GoodCatchModule,
    IncidentAlertModule,
    JsaModule,
    NearMissModule,
    MotorizedEquipmentModule,
    SiteSafetyOrientationModule,
    ToolboxMeetingModule,

],
  providers: [
    NearMissTypeClient,
    DivisionClient, DepartmentClient, ProjectClient, GoodCatchTypeClient, ControlMethodClient, AlertTimeClient,
  GoodCatchClient, JsaClient, ToolboxMeetingClient, MotorizedEquipmentClient, IncidentAlertClient,
  NearMissClient, SiteSafetyOrientationClient

  ],
  exports: [
  ]
})
export class ExFormsModule { }
