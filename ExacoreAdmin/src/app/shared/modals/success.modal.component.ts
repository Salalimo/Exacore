import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'cmp-app-successmodal',
    templateUrl: './success.modal.component.html',
})
export class SuccessModalComponent implements OnInit {



    constructor(
        public dialogRef: MatDialogRef<SuccessModalComponent>,
        @Inject(MAT_DIALOG_DATA) public inputData: any) {
    }

    ngOnInit() {
        if (this.inputData.okButtonText == null)
            this.inputData.okButtonText = 'OK';
    }

    ok() {
        this.dialogRef.close(null);
    }

    cancel() {
        this.dialogRef.close(null);
    }



}
