import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    NearMissClient, NearMissDto, ProjectDto, DivisionDto,
    NearMissTypeDto, ControlMethodDto, DepartmentDto
} from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'nearmiss.component.html',
    styleUrls: ['nearmiss.component.css'],
})
export class NearMissComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    nearMiss: NearMissDto = new NearMissDto();
    constructor(
        private nearMissClient: NearMissClient,
        private route: ActivatedRoute,
    ) {
        this.nearMiss.project = new ProjectDto();
        this.nearMiss.division = new DivisionDto();
        this.nearMiss.department = new DepartmentDto();
        this.nearMiss.controlMethod = new ControlMethodDto();
        this.nearMiss.nearMissType = new NearMissTypeDto();

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
        this.nearMissClient.get(this.id).subscribe((data) => {
            this.nearMiss = data;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
