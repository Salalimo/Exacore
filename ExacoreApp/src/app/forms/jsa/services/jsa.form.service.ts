import { Injectable } from '@angular/core';
import { JsaDto } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class JsaFormDataService {

    jsa: JsaDto = new JsaDto();

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    reset() {
        this.jsa = new JsaDto();
        //this.populateData();
    }

    initialize(gc: JsaDto) {
        this.jsa = gc;
    }

    getForm(): JsaDto {
        return this.jsa;
    }

    populateData() {
        // this.jsa.property = 'value';
    }

    setForm(jsa: JsaDto) {
        this.jsa = jsa;
    }

    buildForm(): FormGroup {

        this.jsa = this.getForm();

        let form = this.formBuilder.group({
            jsaNo: [this.jsa.jsaNo, Validators.required],
            rev: [this.jsa.rev, Validators.required],
            reference: [this.jsa.reference, Validators.required],
            jobDescription: [this.jsa.jobDescription, Validators.required],
            page: [this.jsa.page, Validators.required],
            date: [this.jsa.date, Validators.required],
            title: [this.jsa.title, Validators.required],
            supervisor: [this.jsa.supervisor, Validators.required],
            analysisBy: [this.jsa.analysisBy, Validators.required],
            approvedBy: [this.jsa.approvedBy, Validators.required],
            location: [this.jsa.location, Validators.required],
            department: [this.jsa.department, Validators.required],
            dailySafety: [this.jsa.dailySafety],
            stepactions: new FormArray([]),
            crewattendances: new FormArray([]),

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