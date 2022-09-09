import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

import { UserComponent } from './user/user.component';
import { UsersComponent } from './user/users.component';


@NgModule({
  declarations: [

    UsersComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    MaterialModule,

  ],
  providers: [

  ],
  exports: [
    UsersComponent
  ]
})
export class AdminModule { }
