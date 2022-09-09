import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete.modal.component';
import { InfoModalComponent } from './info.modal.component';
import { SuccessModalComponent } from './success.modal.component';

@NgModule({
  declarations: [
    DeleteModalComponent,
    SuccessModalComponent,
    InfoModalComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [DeleteModalComponent],

  entryComponents: [
    DeleteModalComponent,
    SuccessModalComponent,
    InfoModalComponent,
  ],

})
export class ModalsModule { }

