import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    GoodCatchClient, GoodCatchDto, ProjectDto, DivisionDto, DivisionClient,
    ControlMethodDto, DepartmentDto, GoodCatchTypeDto, DepartmentClient, ProjectClient,
    GoodCatchTypeClient, ControlMethodClient
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
    projects: ProjectDto[] = [];
    divisions: DivisionDto[] = [];
    departments: DepartmentDto[] = [];
    goodCatchTypes: GoodCatchTypeDto[] = [];
    controlMethods: ControlMethodDto[] = [];

    constructor(
        private projectClient: ProjectClient,
        private divisionClient: DivisionClient,
        private goodCatchClient: GoodCatchClient,
        private departmentClient: DepartmentClient,
        private controlMethodClient: ControlMethodClient,
        private goodCatchTypeClient: GoodCatchTypeClient,
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

        this.getDivisions();
        this.getDepartments();
        this.getProjects();
        this.getControlMethods();
        this.getGoodCatchTypes();
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
    getDivisions() {
        this.divisionClient.getAll().subscribe((data) => {
            this.divisions = data;
        });
    }
    getDepartments() {
        this.departmentClient.getAll().subscribe((data) => {
            this.departments = data;
        });
    }
    getProjects() {
        this.projectClient.getAll().subscribe((data) => {
            this.projects = data;
        });
    }
    getGoodCatchTypes() {
        this.goodCatchTypeClient.getAll().subscribe((data) => {
            this.goodCatchTypes = data;
        });
    }
    getControlMethods() {
        this.controlMethodClient.getAll().subscribe((data) => {
            this.controlMethods = data;
        });
    }

    save() {
        this.goodCatch.date = new Date(this.goodCatch.date);
        this.goodCatch.changedDate = new Date();
        if (this.id > 0) {
            this.goodCatchClient.update(this.goodCatch).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
        else {
            this.goodCatchClient.create(this.goodCatch).subscribe((data) => {
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
