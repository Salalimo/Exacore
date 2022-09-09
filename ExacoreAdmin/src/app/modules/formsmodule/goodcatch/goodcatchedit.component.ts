import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    GoodCatchClient, GoodCatchDto, ProjectDto, DivisionDto,
    ControlMethodDto, DepartmentDto, GoodCatchTypeDto
} from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'goodcatchedit.component.html',
    styleUrls: ['goodcatch.component.css'],
})
export class GoodCatchEditComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    goodCatch: GoodCatchDto = new GoodCatchDto();
    constructor(
        private goodCatchClient: GoodCatchClient,
        private route: ActivatedRoute,
        private router: Router,
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

    save() {
        console.log(this.goodCatch)
        this.goodCatch.date = new Date(this.goodCatch.date);
        this.goodCatch.changedDate = new Date(this.goodCatch.changedDate);
        this.goodCatchClient.update(this.goodCatch).subscribe((data) => {
            this.router.navigateByUrl('dashboard');
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
