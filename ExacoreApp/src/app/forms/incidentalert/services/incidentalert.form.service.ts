import { Injectable } from '@angular/core';
import { IncidentAlertDto } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class IncidentAlertFormDataService {

    incidentAlert: IncidentAlertDto = new IncidentAlertDto();

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    reset() {
        this.incidentAlert = new IncidentAlertDto();
        //this.populateData();
    }

    initialize(gc: IncidentAlertDto) {
        this.incidentAlert = gc;
    }

    getForm(): IncidentAlertDto {
        return this.incidentAlert;
    }

    populateData() {
        // this.incidentAlert.property = 'value';
    }

    setForm(incidentAlert: IncidentAlertDto) {
        this.incidentAlert = incidentAlert;
    }

    buildForm(): FormGroup {

        this.incidentAlert = this.getForm();

        let form = this.formBuilder.group({
            date: [this.incidentAlert.date, Validators.required],
            time: [this.incidentAlert.time, Validators.required],
            equipmentIncidentLocation: [this.incidentAlert.equipmentIncidentLocation, Validators.required],
            supervisor: [this.incidentAlert.supervisor, Validators.required],
            involvedJobTitle: [this.incidentAlert.involvedJobTitle, Validators.required],
            incidentDescription: [this.incidentAlert.incidentDescription, Validators.required],
            immediateActionTaken: [this.incidentAlert.immediateActionTaken, Validators.required],
            alertTimeId: [this.incidentAlert.alertTimeId, Validators.required],
            projectId: [this.incidentAlert.projectId, Validators.required],

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