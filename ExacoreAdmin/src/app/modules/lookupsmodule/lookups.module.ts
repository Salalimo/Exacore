import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../shared/material.module';
import { ModalsModule } from '../../shared/modals/modals.module';

import { AlertTimeComponent } from './alerttime/alerttime.component';
import { AlertTimesComponent } from './alerttime/alerttimes.component';
import { ControlMethodsComponent } from './controlmethod/controlmethods.component';
import { ControlMethodComponent } from './controlmethod/controlmethod.component';
import { DepartmentsComponent } from './department/departments.component';
import { DepartmentComponent } from './department/department.component';
import { DivisionsComponent } from './division/divisions.component';
import { DivisionComponent } from './division/division.component';
import { ProjectsComponent } from './project/projects.component';
import { ProjectComponent } from './project/project.component';
import { GoodCatchTypeComponent } from './goodcatchtype/goodcatchtype.component';
import { NearMissTypeComponent } from './nearmisstype/nearmisstype.component';
import { NearMissTypesComponent } from './nearmisstype/nearmisstypes.component';
import { GoodCatchTypesComponent } from './goodcatchtype/goodcatchtypes.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutsComponent } from './workout/workouts.component';
//addimport

@NgModule({
  declarations: [

    AlertTimeComponent,
    AlertTimesComponent,
    ControlMethodsComponent,
    ControlMethodComponent,
    DepartmentsComponent,
    DepartmentComponent,
    DivisionsComponent,
    DivisionComponent,
    ProjectsComponent,
    ProjectComponent,
    GoodCatchTypeComponent,
    NearMissTypeComponent,
    NearMissTypesComponent,
    GoodCatchTypesComponent,
    WorkoutComponent,
    WorkoutsComponent,

    //addcomponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    MaterialModule,
    ModalsModule,


  ],
  providers: [

  ],
  exports: [
  ]
})
export class LookupsModule { }
