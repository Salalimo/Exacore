import { Injectable } from '@angular/core';
import { NearMissDto } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class NearMissFormDataService {

    nearMiss: NearMissDto = new NearMissDto();

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    reset() {
        this.nearMiss = new NearMissDto();
        //this.populateData();
    }

    initialize(gc: NearMissDto) {
        this.nearMiss = gc;
    }

    getForm(): NearMissDto {
        return this.nearMiss;
    }

    populateData() {
        // this.nearMiss.property = 'value';
    }

    setForm(nearMiss: NearMissDto) {
        this.nearMiss = nearMiss;
    }

    buildForm(): FormGroup {

        this.nearMiss = this.getForm();

        let form = this.formBuilder.group({
            date: [this.nearMiss.date, Validators.required],
            time: [this.nearMiss.time, Validators.required],
            affectedJobsiteLocation: [this.nearMiss.affectedJobsiteLocation, Validators.required],
            supervisor: [this.nearMiss.supervisor, Validators.required],
            reporingPerson: [this.nearMiss.reporingPerson, Validators.required],
            nearMissDescription: [this.nearMiss.nearMissDescription, Validators.required],
            immediateAction: [this.nearMiss.immediateAction, Validators.required],
            correctiveAction: [this.nearMiss.correctiveAction, Validators.required],
            ssho: [this.nearMiss.ssho, Validators.required],
            manager: [this.nearMiss.manager, Validators.required],
            unsafeacts: new FormArray([]),
            divisionId: [this.nearMiss.divisionId, Validators.required],
            departmentId: [this.nearMiss.departmentId, Validators.required],
            projectId: [this.nearMiss.projectId, Validators.required],
            nearMissTypeId: [this.nearMiss.nearMissTypeId, Validators.required],
            controlMethodId: [this.nearMiss.controlMethodId, Validators.required],
            wrongselectionofPPE: [this.nearMiss.wrongselectionofPPE],
            disregardSafetyRules: [this.nearMiss.disregardSafetyRules],
            employeefatigue: [this.nearMiss.employeefatigue],
            failuretofollowprocedure: [this.nearMiss.failuretofollowprocedure],
            takingshortcuts: [this.nearMiss.takingshortcuts],
            lackofattention: [this.nearMiss.lackofattention],
            workingtofast: [this.nearMiss.workingtofast],
            lackofemployeetraining: [this.nearMiss.lackofemployeetraining],
            improperLiftingtechnique: [this.nearMiss.improperLiftingtechnique],
            newtaskforemployeeorlackofexperience: [this.nearMiss.newtaskforemployeeorlackofexperience],
            failuretosecureorwarn: [this.nearMiss.failuretosecureorwarn],
            nooroutdatedprocedure: [this.nearMiss.nooroutdatedprocedure],
            operatingwithoutauthority: [this.nearMiss.operatingwithoutauthority],
            hazardousmethodorprocedure: [this.nearMiss.hazardousmethodorprocedure],
            poorpositioning: [this.nearMiss.poorpositioning],
            unsafeposture: [this.nearMiss.unsafeposture],
            travelingpublicenteringworkarea: [this.nearMiss.travelingpublicenteringworkarea],
            incompleteoroutdatedJSA: [this.nearMiss.incompleteoroutdatedJSA],
            improperLOTO: [this.nearMiss.improperLOTO],
            poororhousekeepingpractices: [this.nearMiss.poororhousekeepingpractices],
            guardremovedornotinstalledonequipment: [this.nearMiss.guardremovedornotinstalledonequipment],
            equipmentfailure: [this.nearMiss.equipmentfailure],
            impropermaterialorequipmentused: [this.nearMiss.impropermaterialorequipmentused],
            weather: [this.nearMiss.weather],
            other: [this.nearMiss.other],

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