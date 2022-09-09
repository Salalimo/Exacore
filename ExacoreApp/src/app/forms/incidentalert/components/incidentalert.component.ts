import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncidentAlertFormDataService } from '../services/incidentalert.form.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentAlertDto, IncidentAlertClient, AlertTimeDto, AlertTimeClient
, ProjectDto, ProjectClient
  } from '../../../services/api.service';

@Component({
    templateUrl: 'incidentAlert.component.html',
    styleUrls: ['../../forms.css']
})
export class IncidentAlertComponent implements OnInit, OnDestroy {

    sub: any = {};
    error: string = '';
    incidentAlertForm: FormGroup;
    submitted: boolean = false;
    incidentAlertId: number = 0;
    incidentAlert: IncidentAlertDto = new IncidentAlertDto();

    alertTimes: AlertTimeDto[] = [];
    projects: ProjectDto[] = [];


    constructor(
        private alertTimeClient: AlertTimeClient,
        private projectClient: ProjectClient,

        private formDataService: IncidentAlertFormDataService,
        private incidentAlertClient: IncidentAlertClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {

        this.getAlertTimes();
        this.getProjects();

        this.setupForm();
        this.sub = this.route.params.subscribe(params => {
            this.incidentAlertId = +params['incidentAlertId'];
        });
    }

    get f() { return this.incidentAlertForm.controls; }


    setupForm() {
        this.incidentAlertForm = this.formDataService.buildForm();
    }
    getAlertTimes() {
        this.alertTimeClient.getAll().subscribe((data: AlertTimeDto[]) => {
            this.alertTimes = data;
        })
    }

    getProjects() {
        this.projectClient.getAll().subscribe((data: ProjectDto[]) => {
            this.projects = data;
        })
    }



    saveForm() {
        this.error = '';

        this.incidentAlert = new IncidentAlertDto();
        this.incidentAlert.date = new Date(this.f.date.value);
        this.incidentAlert.time = this.f.time.value;
        this.incidentAlert.equipmentIncidentLocation = this.f.equipmentIncidentLocation.value;
        this.incidentAlert.supervisor = this.f.supervisor.value;
        this.incidentAlert.involvedJobTitle = this.f.involvedJobTitle.value;
        this.incidentAlert.incidentDescription = this.f.incidentDescription.value;
        this.incidentAlert.immediateActionTaken = this.f.immediateActionTaken.value;
        this.incidentAlert.alertTimeId = this.f.alertTimeId.value;
        this.incidentAlert.projectId = this.f.projectId.value;




    }

    onSubmit() {

        this.submitted = true;
        this.saveForm();

        const controls = this.incidentAlertForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                console.log(name, controls[name])
            }
        }

        if (this.incidentAlertForm.invalid) {
            console.log(this.incidentAlertForm)
            console.log(this.incidentAlertForm.invalid)
            this.error = "Please complete all required fields";
            return;
        }

        this.incidentAlertClient.create(this.incidentAlert).subscribe(() => {
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