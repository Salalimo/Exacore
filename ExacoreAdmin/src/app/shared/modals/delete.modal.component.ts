import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'cmp-app-deletemodal',
    templateUrl: './delete.modal.component.html',
    styleUrls: ['./css.component.css']

})
export class DeleteModalComponent implements OnInit {



    constructor(
        public dialogRef: MatDialogRef<DeleteModalComponent>,
        @Inject(MAT_DIALOG_DATA) public inputData: any) {
    }

    ngOnInit() {
        if (this.inputData.buttonText == null)
            this.inputData.buttonText = 'Delete';
        if (this.inputData.showCancel == null)
            this.inputData.showCancel = true;
    }

    ok() {
        this.dialogRef.close(this.inputData.Id);
    }

    cancel() {
        this.dialogRef.close(null);
    }



}
