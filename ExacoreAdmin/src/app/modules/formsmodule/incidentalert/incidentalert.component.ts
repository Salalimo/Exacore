import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncidentAlertClient, IncidentAlertDto, AlertTimeDto, ProjectDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'incidentalert.component.html',
    styleUrls: ['incidentalert.component.css'],
})
export class IncidentAlertComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    incidentAlert: IncidentAlertDto = new IncidentAlertDto();
    constructor(
        private incidentAlertClient: IncidentAlertClient,
        private route: ActivatedRoute,
    ) {
        this.incidentAlert.alertTime = new AlertTimeDto();
        this.incidentAlert.project = new ProjectDto();
    }

    ngOnInit(): void {

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            if (this.id > 0) {
                this.loadForm();
            }
        });

    }

    loadForm() {
        this.incidentAlertClient.get(this.id).subscribe((data) => {
            this.incidentAlert = data;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
