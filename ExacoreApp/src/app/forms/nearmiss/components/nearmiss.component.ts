import { Component, OnInit, OnDestroy } from '@angular/core';
import { NearMissFormDataService } from '../services/nearmiss.form.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NearMissDto, NearMissClient, DivisionDto, DivisionClient
, DepartmentDto, DepartmentClient
, ProjectDto, ProjectClient
, NearMissTypeDto, NearMissTypeClient
, ControlMethodDto, ControlMethodClient
 , UnsafeActDto } from '../../../services/api.service';

@Component({
    templateUrl: 'nearMiss.component.html',
    styleUrls: ['../../forms.css']
})
export class NearMissComponent implements OnInit, OnDestroy {

    sub: any = {};
    error: string = '';
    nearMissForm: FormGroup;
    submitted: boolean = false;
    nearMissId: number = 0;
    nearMiss: NearMissDto = new NearMissDto();

    divisions: DivisionDto[] = [];
    departments: DepartmentDto[] = [];
    projects: ProjectDto[] = [];
    nearMissTypes: NearMissTypeDto[] = [];
    controlMethods: ControlMethodDto[] = [];


    constructor(
        private divisionClient: DivisionClient,
        private departmentClient: DepartmentClient,
        private projectClient: ProjectClient,
        private nearMissTypeClient: NearMissTypeClient,
        private controlMethodClient: ControlMethodClient,

        private formDataService: NearMissFormDataService,
        private nearMissClient: NearMissClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {

        this.getDivisions();
        this.getDepartments();
        this.getProjects();
        this.getNearMissTypes();
        this.getControlMethods();

        this.setupForm();
        this.sub = this.route.params.subscribe(params => {
            this.nearMissId = +params['nearMissId'];
        });
    }

    get f() { return this.nearMissForm.controls; }
    get u() { return this.f.unsafeacts as FormArray; }


    setupForm() {
        this.nearMissForm = this.formDataService.buildForm();
    }
    getDivisions() {
        this.divisionClient.getAll().subscribe((data: DivisionDto[]) => {
            this.divisions = data;
        })
    }

    getDepartments() {
        this.departmentClient.getAll().subscribe((data: DepartmentDto[]) => {
            this.departments = data;
        })
    }

    getProjects() {
        this.projectClient.getAll().subscribe((data: ProjectDto[]) => {
            this.projects = data;
        })
    }

    getNearMissTypes() {
        this.nearMissTypeClient.getAll().subscribe((data: NearMissTypeDto[]) => {
            this.nearMissTypes = data;
        })
    }

    getControlMethods() {
        this.controlMethodClient.getAll().subscribe((data: ControlMethodDto[]) => {
            this.controlMethods = data;
        })
    }



    saveForm() {
        this.error = '';

        this.nearMiss = new NearMissDto();
        this.nearMiss.date = new Date(this.f.date.value);
        this.nearMiss.time = this.f.time.value;
        this.nearMiss.affectedJobsiteLocation = this.f.affectedJobsiteLocation.value;
        this.nearMiss.supervisor = this.f.supervisor.value;
        this.nearMiss.reporingPerson = this.f.reporingPerson.value;
        this.nearMiss.nearMissDescription = this.f.nearMissDescription.value;
        this.nearMiss.immediateAction = this.f.immediateAction.value;
        this.nearMiss.correctiveAction = this.f.correctiveAction.value;
        this.nearMiss.ssho = this.f.ssho.value;
        this.nearMiss.manager = this.f.manager.value;
        this.nearMiss.divisionId = this.f.divisionId.value;
        this.nearMiss.departmentId = this.f.departmentId.value;
        this.nearMiss.projectId = this.f.projectId.value;
        this.nearMiss.nearMissTypeId = this.f.nearMissTypeId.value;
        this.nearMiss.controlMethodId = this.f.controlMethodId.value;
        this.nearMiss.wrongselectionofPPE = this.f.wrongselectionofPPE.value;
        this.nearMiss.disregardSafetyRules = this.f.disregardSafetyRules.value;
        this.nearMiss.employeefatigue = this.f.employeefatigue.value;
        this.nearMiss.failuretofollowprocedure = this.f.failuretofollowprocedure.value;
        this.nearMiss.takingshortcuts = this.f.takingshortcuts.value;
        this.nearMiss.lackofattention = this.f.lackofattention.value;
        this.nearMiss.workingtofast = this.f.workingtofast.value;
        this.nearMiss.lackofemployeetraining = this.f.lackofemployeetraining.value;
        this.nearMiss.improperLiftingtechnique = this.f.improperLiftingtechnique.value;
        this.nearMiss.newtaskforemployeeorlackofexperience = this.f.newtaskforemployeeorlackofexperience.value;
        this.nearMiss.failuretosecureorwarn = this.f.failuretosecureorwarn.value;
        this.nearMiss.nooroutdatedprocedure = this.f.nooroutdatedprocedure.value;
        this.nearMiss.operatingwithoutauthority = this.f.operatingwithoutauthority.value;
        this.nearMiss.hazardousmethodorprocedure = this.f.hazardousmethodorprocedure.value;
        this.nearMiss.poorpositioning = this.f.poorpositioning.value;
        this.nearMiss.unsafeposture = this.f.unsafeposture.value;
        this.nearMiss.travelingpublicenteringworkarea = this.f.travelingpublicenteringworkarea.value;
        this.nearMiss.incompleteoroutdatedJSA = this.f.incompleteoroutdatedJSA.value;
        this.nearMiss.improperLOTO = this.f.improperLOTO.value;
        this.nearMiss.poororhousekeepingpractices = this.f.poororhousekeepingpractices.value;
        this.nearMiss.guardremovedornotinstalledonequipment = this.f.guardremovedornotinstalledonequipment.value;
        this.nearMiss.equipmentfailure = this.f.equipmentfailure.value;
        this.nearMiss.impropermaterialorequipmentused = this.f.impropermaterialorequipmentused.value;
        this.nearMiss.weather = this.f.weather.value;
        this.nearMiss.other = this.f.other.value;

        this.nearMiss.unsafeActs = [];
        this.u.controls.forEach((element: any) => {
            let unsafeActs: UnsafeActDto = new UnsafeActDto();
            unsafeActs.description = element.controls.description.value;

            this.nearMiss.unsafeActs.push(unsafeActs);
        });



    }

    onSubmit() {

        this.submitted = true;
        this.saveForm();

        const controls = this.nearMissForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                console.log(name, controls[name])
            }
        }

        if (this.nearMissForm.invalid) {
            console.log(this.nearMissForm)
            console.log(this.nearMissForm.invalid)
            this.error = "Please complete all required fields";
            return;
        }

        this.nearMissClient.create(this.nearMiss).subscribe(() => {
            this.router.navigateByUrl('');
        });
    }

     onChangeUnsafeActs(e) {
        const numberOfUnsafeActs = e.target.value || 0;
        if (this.u.length < numberOfUnsafeActs) {
            for (let i = this.u.length; i < numberOfUnsafeActs; i++) {
                this.u.push(this.formBuilder.group({
                    description: ['', Validators.required],

                }));
            }
        } else {
            for (let i = this.u.length; i >= numberOfUnsafeActs; i--) {
                this.u.removeAt(i);
            }
        }
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