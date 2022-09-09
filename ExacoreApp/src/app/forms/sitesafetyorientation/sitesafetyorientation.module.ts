import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SiteSafetyOrientationComponent } from './components/sitesafetyorientation.component';

//addimports


@NgModule({
  declarations: [
  SiteSafetyOrientationComponent,
//addComponents


  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IonicModule,


  ],
  providers: [

  ],
  exports: [

  ]
})
export class SiteSafetyOrientationModule { }
