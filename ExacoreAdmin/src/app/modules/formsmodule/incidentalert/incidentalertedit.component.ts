import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncidentAlertClient, IncidentAlertDto, AlertTimeDto, ProjectDto, ProjectClient, AlertTimeClient } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'incidentalertedit.component.html',
    styleUrls: ['incidentalert.component.css'],
})
export class IncidentAlertEditComponent implements OnInit, OnDestroy {

    sub: any;
    id: number = 0;
    projects: ProjectDto[] = [];
    alerts: AlertTimeDto[] = [];
    incidentAlert: IncidentAlertDto = new IncidentAlertDto();

    constructor(
        private incidentAlertClient: IncidentAlertClient,
        private alertTimeClient: AlertTimeClient,
        private projectClient: ProjectClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.incidentAlert.project = new ProjectDto();
        this.incidentAlert.alertTime = new AlertTimeDto();
    }

    ngOnInit(): void {

        this.getProjects();
        this.getAlerts();

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            if (this.id > 0) {
                this.loadForm();
            }
        });

    }
    getProjects() {
        this.projectClient.getAll().subscribe((data) => {
            this.projects = data;
        });
    }
    getAlerts() {
        this.alertTimeClient.getAll().subscribe((data) => {
            this.alerts = data;
        });
    }
    loadForm() {
        this.incidentAlertClient.get(this.id).subscribe((data) => {
            this.incidentAlert = data;
        });
    }
    save() {
        console.log(this.incidentAlert.date)
        this.incidentAlert.date = new Date(this.incidentAlert.date);
        this.incidentAlert.changedDate = new Date();
        if (this.id > 0) {
            this.incidentAlertClient.update(this.incidentAlert).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
        else {
            this.incidentAlertClient.create(this.incidentAlert).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
    }
    cancel() {
        this.router.navigateByUrl('dashboard');
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
