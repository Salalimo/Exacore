import { Injectable } from '@angular/core';
import { SiteSafetyOrientationDto } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class SiteSafetyOrientationFormDataService {

    siteSafetyOrientation: SiteSafetyOrientationDto = new SiteSafetyOrientationDto();

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    reset() {
        this.siteSafetyOrientation = new SiteSafetyOrientationDto();
        //this.populateData();
    }

    initialize(gc: SiteSafetyOrientationDto) {
        this.siteSafetyOrientation = gc;
    }

    getForm(): SiteSafetyOrientationDto {
        return this.siteSafetyOrientation;
    }

    populateData() {
        // this.siteSafetyOrientation.property = 'value';
    }

    setForm(siteSafetyOrientation: SiteSafetyOrientationDto) {
        this.siteSafetyOrientation = siteSafetyOrientation;
    }

    buildForm(): FormGroup {

        this.siteSafetyOrientation = this.getForm();

        let form = this.formBuilder.group({
            name: [this.siteSafetyOrientation.name, Validators.required],
            date: [this.siteSafetyOrientation.date, Validators.required],
            projectId: [this.siteSafetyOrientation.projectId, Validators.required],
            generalHealth: [this.siteSafetyOrientation.generalHealth],
            houseKeeping: [this.siteSafetyOrientation.houseKeeping],
            powerTools: [this.siteSafetyOrientation.powerTools],
            firePrevention: [this.siteSafetyOrientation.firePrevention],
            welding: [this.siteSafetyOrientation.welding],
            compressedAir: [this.siteSafetyOrientation.compressedAir],
            electricalSafety: [this.siteSafetyOrientation.electricalSafety],
            aerialLifts: [this.siteSafetyOrientation.aerialLifts],
            scaffolding: [this.siteSafetyOrientation.scaffolding],
            trenching: [this.siteSafetyOrientation.trenching],
            fallProtection: [this.siteSafetyOrientation.fallProtection],
            fleetSafety: [this.siteSafetyOrientation.fleetSafety],
            craneSafety: [this.siteSafetyOrientation.craneSafety],
            firstAid: [this.siteSafetyOrientation.firstAid],
            pathogens: [this.siteSafetyOrientation.pathogens],
            lead: [this.siteSafetyOrientation.lead],
            confinedSpaces: [this.siteSafetyOrientation.confinedSpaces],
            lockout: [this.siteSafetyOrientation.lockout],
            forkTrucks: [this.siteSafetyOrientation.forkTrucks],
            protectiveEquipment: [this.siteSafetyOrientation.protectiveEquipment],
            hearingProtection: [this.siteSafetyOrientation.hearingProtection],
            designateFacilities: [this.siteSafetyOrientation.designateFacilities],
            coverage: [this.siteSafetyOrientation.coverage],
            contactInformation: [this.siteSafetyOrientation.contactInformation],
            whatRequires: [this.siteSafetyOrientation.whatRequires],
            whenToReport: [this.siteSafetyOrientation.whenToReport],
            whoToNotify: [this.siteSafetyOrientation.whoToNotify],
            testingProcedures: [this.siteSafetyOrientation.testingProcedures],
            reportingOfMedication: [this.siteSafetyOrientation.reportingOfMedication],
            eap: [this.siteSafetyOrientation.eap],
            progressivePolicy: [this.siteSafetyOrientation.progressivePolicy],
            obtainInformation: [this.siteSafetyOrientation.obtainInformation],
            sds: [this.siteSafetyOrientation.sds],
            hazardCommunication: [this.siteSafetyOrientation.hazardCommunication],
            labelingSystems: [this.siteSafetyOrientation.labelingSystems],
            protectiveMeasures: [this.siteSafetyOrientation.protectiveMeasures],
            alarmSystems: [this.siteSafetyOrientation.alarmSystems],
            shelterAreas: [this.siteSafetyOrientation.shelterAreas],
            musteringZones: [this.siteSafetyOrientation.musteringZones],
            accountingProcedures: [this.siteSafetyOrientation.accountingProcedures],
            hardHats: [this.siteSafetyOrientation.hardHats],
            safetyVests: [this.siteSafetyOrientation.safetyVests],
            handProtection: [this.siteSafetyOrientation.handProtection],
            footProtection: [this.siteSafetyOrientation.footProtection],
            faceProtection: [this.siteSafetyOrientation.faceProtection],
            hearingProtection2: [this.siteSafetyOrientation.hearingProtection2],
            protectiveClothing: [this.siteSafetyOrientation.protectiveClothing],
            personalFallArrest: [this.siteSafetyOrientation.personalFallArrest],
            stepLadders: [this.siteSafetyOrientation.stepLadders],
            extensionLadders: [this.siteSafetyOrientation.extensionLadders],
            capacities: [this.siteSafetyOrientation.capacities],
            properUse: [this.siteSafetyOrientation.properUse],

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