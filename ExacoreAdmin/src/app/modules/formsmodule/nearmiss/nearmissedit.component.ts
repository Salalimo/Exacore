import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    NearMissClient, NearMissDto, ProjectDto, DivisionDto, NearMissTypeClient, ControlMethodClient,
    NearMissTypeDto, ControlMethodDto, DepartmentDto, DepartmentClient, ProjectClient, DivisionClient
} from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'nearmissedit.component.html',
    styleUrls: ['nearmiss.component.css'],
})
export class NearMissEditComponent implements OnInit, OnDestroy {

    sub: any;
    id: number = 0;
    projects: ProjectDto[] = [];
    divisions: DivisionDto[] = [];
    departments: DepartmentDto[] = [];
    nearMissTypes: NearMissTypeDto[] = [];
    controlMethods: ControlMethodDto[] = [];
    nearMiss: NearMissDto = new NearMissDto();

    constructor(
        private ControlMethodClient: ControlMethodClient,
        private nearMissTypeClient: NearMissTypeClient,
        private departmentClient: DepartmentClient,
        private divisionClient: DivisionClient,
        private nearMissClient: NearMissClient,
        private projectClient: ProjectClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.nearMiss.project = new ProjectDto();
        this.nearMiss.division = new DivisionDto();
        this.nearMiss.department = new DepartmentDto();
        this.nearMiss.controlMethod = new ControlMethodDto();
        this.nearMiss.nearMissType = new NearMissTypeDto();

    }

    ngOnInit(): void {

        this.getProjects();
        this.getDivisions();
        this.getDepartments();
        this.getNearMissType();
        this.getControlMethods();

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            if (this.id > 0) {
                this.loadForm();
            }
        });
    }

    save() {
        this.nearMiss.date = new Date(this.nearMiss.date);
        this.nearMiss.changedDate = new Date();
        if (this.id > 0) {
            this.nearMissClient.update(this.nearMiss).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
        else {
            this.nearMissClient.create(this.nearMiss).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
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
    getNearMissType() {
        this.nearMissTypeClient.getAll().subscribe((data) => {
            this.nearMissTypes = data;
        });
    }
    getControlMethods() {
        this.ControlMethodClient.getAll().subscribe((data) => {
            this.controlMethods = data;
        });
    }
    cancel() {
        this.router.navigateByUrl('dashboard');
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
