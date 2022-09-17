import { Component, OnInit, OnDestroy } from '@angular/core';
import { SiteSafetyOrientationClient,SiteSafetyOrientationDto, ProjectDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'sitesafetyedit.component.html',
    styleUrls: ['sitesafety.component.css'],
})
export class SiteSafetyEditComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    siteSafetyOrientation: SiteSafetyOrientationDto = new SiteSafetyOrientationDto();
    constructor(
        private siteSafetyOrientationClient: SiteSafetyOrientationClient,
        private route: ActivatedRoute,
        private router: Router,
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
    save() {
        console.log(this.siteSafetyOrientation.date)
        this.siteSafetyOrientation.date = new Date(this.siteSafetyOrientation.date);
        this.siteSafetyOrientation.changedDate = new Date();
        if (this.id > 0) {
            this.siteSafetyOrientationClient.update(this.siteSafetyOrientation).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
        else {
            this.siteSafetyOrientationClient.create(this.siteSafetyOrientation).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
    }
    loadForm() {
        this.siteSafetyOrientationClient.get(this.id).subscribe((data) => {
            this.siteSafetyOrientation = data;
        });
    }
    cancel() {
        this.router.navigateByUrl('dashboard');
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
