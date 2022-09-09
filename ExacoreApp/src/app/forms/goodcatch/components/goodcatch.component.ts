import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoodCatchFormDataService } from '../services/goodcatch.form.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GoodCatchDto, GoodCatchClient, DivisionDto, DivisionClient
, DepartmentDto, DepartmentClient
, ProjectDto, ProjectClient
, GoodCatchTypeDto, GoodCatchTypeClient
, ControlMethodDto, ControlMethodClient
  } from '../../../services/api.service';

@Component({
    templateUrl: 'goodCatch.component.html',
    styleUrls: ['../../forms.css']
})
export class GoodCatchComponent implements OnInit, OnDestroy {

    sub: any = {};
    error: string = '';
    goodCatchForm: FormGroup;
    goodCatchId: number = 0;
    goodCatch: GoodCatchDto = new GoodCatchDto();

    divisions: DivisionDto[] = [];
    departments: DepartmentDto[] = [];
    projects: ProjectDto[] = [];
    goodCatchTypes: GoodCatchTypeDto[] = [];
    controlMethods: ControlMethodDto[] = [];


    constructor(
        private divisionClient: DivisionClient,
        private departmentClient: DepartmentClient,
        private projectClient: ProjectClient,
        private goodCatchTypeClient: GoodCatchTypeClient,
        private controlMethodClient: ControlMethodClient,

        private formDataService: GoodCatchFormDataService,
        private goodCatchClient: GoodCatchClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {

        this.getDivisions();
        this.getDepartments();
        this.getProjects();
        this.getGoodCatchTypes();
        this.getControlMethods();

        this.setupForm();
        this.sub = this.route.params.subscribe(params => {
            this.goodCatchId = +params['goodCatchId'];
        });
    }

    get f() { return this.goodCatchForm.controls; }


    setupForm() {
        this.goodCatchForm = this.formDataService.buildForm();
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

    getGoodCatchTypes() {
        this.goodCatchTypeClient.getAll().subscribe((data: GoodCatchTypeDto[]) => {
            this.goodCatchTypes = data;
        })
    }

    getControlMethods() {
        this.controlMethodClient.getAll().subscribe((data: ControlMethodDto[]) => {
            this.controlMethods = data;
        })
    }



    saveForm() {
        this.error = '';

        this.goodCatch = new GoodCatchDto();
        this.goodCatch.date = new Date(this.f.date.value);
        this.goodCatch.time = this.f.time.value;
        this.goodCatch.affectedJobsiteLocation = this.f.affectedJobsiteLocation.value;
        this.goodCatch.supervisor = this.f.supervisor.value;
        this.goodCatch.name = this.f.name.value;
        this.goodCatch.description = this.f.description.value;
        this.goodCatch.immediateActionTaken = this.f.immediateActionTaken.value;
        this.goodCatch.divisionId = this.f.divisionId.value;
        this.goodCatch.departmentId = this.f.departmentId.value;
        this.goodCatch.projectId = this.f.projectId.value;
        this.goodCatch.goodCatchTypeId = this.f.goodCatchTypeId.value;
        this.goodCatch.controlMethodId = this.f.controlMethodId.value;




    }

    onSubmit() {
        this.goodCatchForm.markAllAsTouched();

        this.saveForm();

        const controls = this.goodCatchForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                console.log(name, controls[name])
            }
        }

        if (this.goodCatchForm.invalid) {
            console.log(this.goodCatchForm)
            console.log(this.goodCatchForm.invalid)
            this.error = "Please complete all required fields";
            return;
        }

        this.goodCatchClient.create(this.goodCatch).subscribe(() => {
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