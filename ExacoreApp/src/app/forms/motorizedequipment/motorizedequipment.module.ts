import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MotorizedEquipmentComponent } from './components/motorizedequipment.component';

//addimports


@NgModule({
  declarations: [
  MotorizedEquipmentComponent,
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
export class MotorizedEquipmentModule { }
