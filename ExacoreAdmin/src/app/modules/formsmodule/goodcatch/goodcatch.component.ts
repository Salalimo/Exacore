import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    GoodCatchClient, GoodCatchDto, ProjectDto, DivisionDto, DepartmentClient,
    NearMissTypeDto, ControlMethodDto, DepartmentDto, GoodCatchTypeDto
} from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'goodcatch.component.html',
    styleUrls: ['goodcatch.component.css'],
})
export class GoodCatchComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    goodCatch: GoodCatchDto = new GoodCatchDto();
    constructor(
        private goodCatchClient: GoodCatchClient,
        private route: ActivatedRoute,
    ) {
        this.goodCatch.project = new ProjectDto();
        this.goodCatch.division = new DivisionDto();
        this.goodCatch.department = new DepartmentDto();
        this.goodCatch.controlMethod = new ControlMethodDto();
        this.goodCatch.goodCatchType = new GoodCatchTypeDto();
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
        this.goodCatchClient.get(this.id).subscribe((data) => {
            this.goodCatch = data;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
