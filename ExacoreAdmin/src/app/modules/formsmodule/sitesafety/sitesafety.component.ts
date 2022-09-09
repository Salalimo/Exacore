import { Component, OnInit, OnDestroy } from '@angular/core';
import { SiteSafetyOrientationClient,SiteSafetyOrientationDto, ProjectDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'sitesafety.component.html',
    styleUrls: ['sitesafety.component.css'],
})
export class SiteSafetyComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    siteSafetyOrientation: SiteSafetyOrientationDto = new SiteSafetyOrientationDto();
    constructor(
        private siteSafetyOrientationClient: SiteSafetyOrientationClient,
        private route: ActivatedRoute,
    ) {
        this.siteSafetyOrientation.project = new ProjectDto();
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
        this.siteSafetyOrientationClient.get(this.id).subscribe((data) => {
            this.siteSafetyOrientation = data;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
