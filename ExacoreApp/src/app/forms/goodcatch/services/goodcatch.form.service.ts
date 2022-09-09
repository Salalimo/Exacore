import { Injectable } from '@angular/core';
import { GoodCatchDto } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class GoodCatchFormDataService {

    goodCatch: GoodCatchDto = new GoodCatchDto();

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    reset() {
        this.goodCatch = new GoodCatchDto();
        //this.populateData();
    }

    initialize(gc: GoodCatchDto) {
        this.goodCatch = gc;
    }

    getForm(): GoodCatchDto {
        return this.goodCatch;
    }

    populateData() {
        // this.goodCatch.property = 'value';
    }

    setForm(goodCatch: GoodCatchDto) {
        this.goodCatch = goodCatch;
    }

    buildForm(): FormGroup {

        this.goodCatch = this.getForm();

        let form = this.formBuilder.group({
            date: [this.goodCatch.date, Validators.required],
            time: [this.goodCatch.time, Validators.required],
            affectedJobsiteLocation: [this.goodCatch.affectedJobsiteLocation, Validators.required],
            supervisor: [this.goodCatch.supervisor, Validators.required],
            name: [this.goodCatch.name, Validators.required],
            description: [this.goodCatch.description, Validators.required],
            immediateActionTaken: [this.goodCatch.immediateActionTaken, Validators.required],
            divisionId: [this.goodCatch.divisionId, Validators.required],
            departmentId: [this.goodCatch.departmentId, Validators.required],
            projectId: [this.goodCatch.projectId, Validators.required],
            goodCatchTypeId: [this.goodCatch.goodCatchTypeId, Validators.required],
            controlMethodId: [this.goodCatch.controlMethodId, Validators.required],

        });
        return form;
    }


    isDateValid(date) {
        console.log(1)
        try {
            let d = new Date(date);
            if (d + '' == "Invalid Date")
                return false;
            else if (d.getFullYear() > 2099)
                return false;
            else
                return true;
        }
        catch {
            return false;
        }
    }

}