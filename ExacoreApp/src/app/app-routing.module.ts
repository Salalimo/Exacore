import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './loginmodule/services/auth.guard';

import { LoginComponent } from './loginmodule/components/login.component';

import { IncidentAlertComponent } from './forms/incidentalert/components/incidentalert.component';
import { GoodCatchComponent } from './forms/goodcatch/components/goodcatch.component';
import { JsaComponent } from './forms/jsa/components/jsa.component';
import { MotorizedEquipmentComponent } from './forms/motorizedequipment/components/motorizedequipment.component';
import { NearMissComponent } from './forms/nearmiss/components/nearmiss.component';
import { SiteSafetyOrientationComponent } from './forms/sitesafetyorientation/components/sitesafetyorientation.component';
import { ToolboxMeetingComponent } from './forms/toolboxmeeting/components/toolboxmeeting.component';
//addimport

const routes: Routes = [
  {
    path: 'home', pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  //forms
  { path: 'app/forms/incidentAlert', component: IncidentAlertComponent, canActivate: [AuthGuard] },
  { path: 'app/forms/goodCatch', component: GoodCatchComponent, canActivate: [AuthGuard] },
  { path: 'app/forms/jsa', component: JsaComponent, canActivate: [AuthGuard] },
  { path: 'app/forms/motorizedEquipment', component: MotorizedEquipmentComponent, canActivate: [AuthGuard] },
  { path: 'app/forms/nearMiss', component: NearMissComponent, canActivate: [AuthGuard] },
  { path: 'app/forms/siteSafetyOrientation', component: SiteSafetyOrientationComponent, canActivate: [AuthGuard] },
  { path: 'app/forms/toolboxMeeting', component: ToolboxMeetingComponent, canActivate: [AuthGuard] },
  //addroute

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
