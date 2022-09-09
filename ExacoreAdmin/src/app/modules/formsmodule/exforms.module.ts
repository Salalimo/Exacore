import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { GoodCatchComponent } from './goodcatch/goodcatch.component';
import { JsaComponent } from './jsa/jsa.component';
import { IncidentAlertComponent } from './incidentalert/incidentalert.component';
import { MotorizedEquipmentComponent } from './motorizedequipment/motorizedequipment.component';
import { NearMissComponent } from './nearmiss/nearmiss.component';
import { SiteSafetyComponent } from './sitesafety/sitesafety.component';
import { ToolboxMeetingComponent } from './toolboxmeeting/toolboxmeeting.component';

import { GoodCatchEditComponent } from './goodcatch/goodcatchedit.component';

//addimport

@NgModule({
  declarations: [

    GoodCatchComponent,
    JsaComponent,
    IncidentAlertComponent,
    MotorizedEquipmentComponent,
    NearMissComponent,
    SiteSafetyComponent,
    ToolboxMeetingComponent,

    GoodCatchEditComponent,
    
    //addcomponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,



  ],
  providers: [



  ],
  exports: [
  ]
})
export class ExFormsModule { }
