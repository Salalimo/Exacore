import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/loginmodule/services/auth.guard';
import { RoleEnum } from './modules/loginmodule/models/RoleEnum';

import { LoginComponent } from './modules/loginmodule/components/login.component';
import { ForgotPasswordComponent } from './modules/loginmodule/components/forgotPassword/forgot.password.component';
import { ResetPasswordComponent } from './modules/loginmodule/components/resetPassword/reset.password.component';
// import { RegisterComponent } from './modules/loginmodule/components/register/register.component';
// import { RegisterationConfirmationComponent } from './modules/loginmodule/components/registerationConfirmation/registeration.confirmation.component';
import { ActivateAccountComponent } from './modules/loginmodule/components/activateAccount/activate.account.component';
import { ResendVerificationComponent } from './modules/loginmodule/components/resendVerification/resend.verification.component';

import { MainComponent } from './main.component';
import { MainSMComponent } from './main-sm.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AlertTimeComponent } from './modules/lookupsmodule/alerttime/alerttime.component';
import { AlertTimesComponent } from './modules/lookupsmodule/alerttime/alerttimes.component';
import { ControlMethodsComponent } from './modules/lookupsmodule/controlmethod/controlmethods.component';
import { ControlMethodComponent } from './modules/lookupsmodule/controlmethod/controlmethod.component';
import { DepartmentsComponent } from './modules/lookupsmodule/department/departments.component';
import { DepartmentComponent } from './modules/lookupsmodule/department/department.component';
import { DivisionsComponent } from './modules/lookupsmodule/division/divisions.component';
import { DivisionComponent } from './modules/lookupsmodule/division/division.component';
import { ProjectsComponent } from './modules/lookupsmodule/project/projects.component';
import { ProjectComponent } from './modules/lookupsmodule/project/project.component';
import { GoodCatchTypeComponent } from './modules/lookupsmodule/goodcatchtype/goodcatchtype.component';
import { NearMissTypeComponent } from './modules/lookupsmodule/nearmisstype/nearmisstype.component';
import { NearMissTypesComponent } from './modules/lookupsmodule/nearmisstype/nearmisstypes.component';
//account
import { UsersComponent } from './modules/adminmodule/user/users.component';
import { UserComponent } from './modules/adminmodule/user/user.component';
import { GoodCatchTypesComponent } from './modules/lookupsmodule/goodcatchtype/goodcatchtypes.component';
//forms
import { FormsMainComponent } from './formsmain.component';
import { GoodCatchComponent } from './modules/formsmodule/goodcatch/goodcatch.component';
import { IncidentAlertComponent } from './modules/formsmodule/incidentalert/incidentalert.component';
import { JsaComponent } from './modules/formsmodule/jsa/jsa.component';
import { MotorizedEquipmentComponent } from './modules/formsmodule/motorizedequipment/motorizedequipment.component';
import { NearMissComponent } from './modules/formsmodule/nearmiss/nearmiss.component';
import { SiteSafetyComponent } from './modules/formsmodule/sitesafety/sitesafety.component';
import { ToolboxMeetingComponent } from './modules/formsmodule/toolboxmeeting/toolboxmeeting.component';

import { GoodCatchEditComponent } from './modules/formsmodule/goodcatch/goodcatchedit.component';

//addimport

const routes: Routes = [

  //account
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  // { path: 'registerationconfirmation', component: RegisterationConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'activateaccount', component: ActivateAccountComponent },
  { path: 'resendverification', component: ResendVerificationComponent },

  {
    path: '',
    component: MainComponent,
    children: [

      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

      //lookups
      { path: 'alertTimes', component: AlertTimesComponent, canActivate: [AuthGuard] },
      { path: 'controlMethods', component: ControlMethodsComponent, canActivate: [AuthGuard] },
      { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
      { path: 'divisions', component: DivisionsComponent, canActivate: [AuthGuard] },
      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'goodCatchTypes', component: GoodCatchTypesComponent, canActivate: [AuthGuard] },
      { path: 'nearMissTypes', component: NearMissTypesComponent, canActivate: [AuthGuard] },
      //account
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      //forms
    ]
 , canActivate: [AuthGuard] },
  
  {
    path: '',
    component: MainSMComponent,
    children: [

      { path: 'alertTime', component: AlertTimeComponent, canActivate: [AuthGuard] },
      { path: 'alertTime/:id', component: AlertTimeComponent, canActivate: [AuthGuard] },
      { path: 'controlMethod', component: ControlMethodComponent, canActivate: [AuthGuard] },
      { path: 'controlMethod/:id', component: ControlMethodComponent, canActivate: [AuthGuard] },
      { path: 'department', component: DepartmentComponent, canActivate: [AuthGuard] },
      { path: 'department/:id', component: DepartmentComponent, canActivate: [AuthGuard] },
      { path: 'division', component: DivisionComponent, canActivate: [AuthGuard] },
      { path: 'division/:id', component: DivisionComponent, canActivate: [AuthGuard] },
      { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: 'goodCatchType/:id', component: GoodCatchTypeComponent, canActivate: [AuthGuard] },
      { path: 'goodCatchType', component: GoodCatchTypeComponent, canActivate: [AuthGuard] },
      { path: 'nearMissType', component: NearMissTypeComponent, canActivate: [AuthGuard] },
      { path: 'nearMissType/:id', component: NearMissTypeComponent, canActivate: [AuthGuard] },
      //account
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
    ]
 , canActivate: [AuthGuard] },
  {
    path: '',
    component: FormsMainComponent,
    children: [
      { path: 'forms/goodcatch/:id', component: GoodCatchComponent, canActivate: [AuthGuard] },
      { path: 'forms/incidentalert/:id', component: IncidentAlertComponent, canActivate: [AuthGuard] },
      { path: 'forms/jsa/:id', component: JsaComponent, canActivate: [AuthGuard] },
      { path: 'forms/motorizedequipment/:id', component: MotorizedEquipmentComponent, canActivate: [AuthGuard] },
      { path: 'forms/nearmiss/:id', component: NearMissComponent, canActivate: [AuthGuard] },
      { path: 'forms/sitesafetyorientation/:id', component: SiteSafetyComponent, canActivate: [AuthGuard] },
      { path: 'forms/toolboxmeeting/:id', component: ToolboxMeetingComponent, canActivate: [AuthGuard] },

      { path: 'forms/goodcatch/edit/:id', component: GoodCatchEditComponent, canActivate: [AuthGuard] },
      { path: 'forms/incidentalert/edit/:id', component: IncidentAlertComponent, canActivate: [AuthGuard] },
      { path: 'forms/jsa/edit/:id', component: JsaComponent, canActivate: [AuthGuard] },
      { path: 'forms/motorizedequipment/edit/:id', component: MotorizedEquipmentComponent, canActivate: [AuthGuard] },
      { path: 'forms/nearmiss/edit/:id', component: NearMissComponent, canActivate: [AuthGuard] },
      { path: 'forms/sitesafetyorientation/edit/:id', component: SiteSafetyComponent, canActivate: [AuthGuard] },
      { path: 'forms/toolboxmeeting/edit/:id', component: ToolboxMeetingComponent, canActivate: [AuthGuard] },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
