import { Component, OnInit, OnDestroy } from '@angular/core';
import { SiteSafetyOrientationFormDataService } from '../services/sitesafetyorientation.form.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteSafetyOrientationDto, SiteSafetyOrientationClient, ProjectDto, ProjectClient
  } from '../../../services/api.service';

@Component({
    templateUrl: 'siteSafetyOrientation.component.html',
    styleUrls: ['../../forms.css']
})
export class SiteSafetyOrientationComponent implements OnInit, OnDestroy {

    sub: any = {};
    error: string = '';
    siteSafetyOrientationForm: FormGroup;
    submitted: boolean = false;
    siteSafetyOrientationId: number = 0;
    siteSafetyOrientation: SiteSafetyOrientationDto = new SiteSafetyOrientationDto();

    projects: ProjectDto[] = [];


    constructor(
        private projectClient: ProjectClient,

        private formDataService: SiteSafetyOrientationFormDataService,
        private siteSafetyOrientationClient: SiteSafetyOrientationClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {

        this.getProjects();

        this.setupForm();
        this.sub = this.route.params.subscribe(params => {
            this.siteSafetyOrientationId = +params['siteSafetyOrientationId'];
        });
    }

    get f() { return this.siteSafetyOrientationForm.controls; }


    setupForm() {
        this.siteSafetyOrientationForm = this.formDataService.buildForm();
    }
    getProjects() {
        this.projectClient.getAll().subscribe((data: ProjectDto[]) => {
            this.projects = data;
        })
    }



    saveForm() {
        this.error = '';

        this.siteSafetyOrientation = new SiteSafetyOrientationDto();
        this.siteSafetyOrientation.name = this.f.name.value;
        this.siteSafetyOrientation.date = new Date(this.f.date.value);
        this.siteSafetyOrientation.projectId = this.f.projectId.value;
        this.siteSafetyOrientation.generalHealth = this.f.generalHealth.value;
        this.siteSafetyOrientation.houseKeeping = this.f.houseKeeping.value;
        this.siteSafetyOrientation.powerTools = this.f.powerTools.value;
        this.siteSafetyOrientation.firePrevention = this.f.firePrevention.value;
        this.siteSafetyOrientation.welding = this.f.welding.value;
        this.siteSafetyOrientation.compressedAir = this.f.compressedAir.value;
        this.siteSafetyOrientation.electricalSafety = this.f.electricalSafety.value;
        this.siteSafetyOrientation.aerialLifts = this.f.aerialLifts.value;
        this.siteSafetyOrientation.scaffolding = this.f.scaffolding.value;
        this.siteSafetyOrientation.trenching = this.f.trenching.value;
        this.siteSafetyOrientation.fallProtection = this.f.fallProtection.value;
        this.siteSafetyOrientation.fleetSafety = this.f.fleetSafety.value;
        this.siteSafetyOrientation.craneSafety = this.f.craneSafety.value;
        this.siteSafetyOrientation.firstAid = this.f.firstAid.value;
        this.siteSafetyOrientation.pathogens = this.f.pathogens.value;
        this.siteSafetyOrientation.lead = this.f.lead.value;
        this.siteSafetyOrientation.confinedSpaces = this.f.confinedSpaces.value;
        this.siteSafetyOrientation.lockout = this.f.lockout.value;
        this.siteSafetyOrientation.forkTrucks = this.f.forkTrucks.value;
        this.siteSafetyOrientation.protectiveEquipment = this.f.protectiveEquipment.value;
        this.siteSafetyOrientation.hearingProtection = this.f.hearingProtection.value;
        this.siteSafetyOrientation.designateFacilities = this.f.designateFacilities.value;
        this.siteSafetyOrientation.coverage = this.f.coverage.value;
        this.siteSafetyOrientation.contactInformation = this.f.contactInformation.value;
        this.siteSafetyOrientation.whatRequires = this.f.whatRequires.value;
        this.siteSafetyOrientation.whenToReport = this.f.whenToReport.value;
        this.siteSafetyOrientation.whoToNotify = this.f.whoToNotify.value;
        this.siteSafetyOrientation.testingProcedures = this.f.testingProcedures.value;
        this.siteSafetyOrientation.reportingOfMedication = this.f.reportingOfMedication.value;
        this.siteSafetyOrientation.eap = this.f.eap.value;
        this.siteSafetyOrientation.progressivePolicy = this.f.progressivePolicy.value;
        this.siteSafetyOrientation.obtainInformation = this.f.obtainInformation.value;
        this.siteSafetyOrientation.sds = this.f.sds.value;
        this.siteSafetyOrientation.hazardCommunication = this.f.hazardCommunication.value;
        this.siteSafetyOrientation.labelingSystems = this.f.labelingSystems.value;
        this.siteSafetyOrientation.protectiveMeasures = this.f.protectiveMeasures.value;
        this.siteSafetyOrientation.alarmSystems = this.f.alarmSystems.value;
        this.siteSafetyOrientation.shelterAreas = this.f.shelterAreas.value;
        this.siteSafetyOrientation.musteringZones = this.f.musteringZones.value;
        this.siteSafetyOrientation.accountingProcedures = this.f.accountingProcedures.value;
        this.siteSafetyOrientation.hardHats = this.f.hardHats.value;
        this.siteSafetyOrientation.safetyVests = this.f.safetyVests.value;
        this.siteSafetyOrientation.handProtection = this.f.handProtection.value;
        this.siteSafetyOrientation.footProtection = this.f.footProtection.value;
        this.siteSafetyOrientation.faceProtection = this.f.faceProtection.value;
        this.siteSafetyOrientation.hearingProtection2 = this.f.hearingProtection2.value;
        this.siteSafetyOrientation.protectiveClothing = this.f.protectiveClothing.value;
        this.siteSafetyOrientation.personalFallArrest = this.f.personalFallArrest.value;
        this.siteSafetyOrientation.stepLadders = this.f.stepLadders.value;
        this.siteSafetyOrientation.extensionLadders = this.f.extensionLadders.value;
        this.siteSafetyOrientation.capacities = this.f.capacities.value;
        this.siteSafetyOrientation.properUse = this.f.properUse.value;




    }

    onSubmit() {

        this.submitted = true;
        this.saveForm();

        const controls = this.siteSafetyOrientationForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                console.log(name, controls[name])
            }
        }

        if (this.siteSafetyOrientationForm.invalid) {
            console.log(this.siteSafetyOrientationForm)
            console.log(this.siteSafetyOrientationForm.invalid)
            this.error = "Please complete all required fields";
            return;
        }

        this.siteSafetyOrientationClient.create(this.siteSafetyOrientation).subscribe(() => {
            this.router.navigateByUrl('');
        });
    }



    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isBirthDateValid(date) {
        try {
            if (!date)
                return true;
            let d = new Date(date);
            if (d + '' == "Invalid Date")
                return false;
            else if (d > new Date() || d.getFullYear() < 1900)
                return false;
            else
                return true;
        }
        catch {
            console.log(2);
            return false;
        }
    }
}