import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsaClient, JsaDto, CrewAttendanceDto, StepActionDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'jsaedit.component.html',
    styleUrls: ['jsa.component.css'],
})
export class JsaEditComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    jsa: JsaDto = new JsaDto();
    crews: CrewAttendanceDto[] = [];
    stepActions: StepActionDto[] = [];

    constructor(
        private jsaClient: JsaClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.jsa.stepActions = [];
        this.jsa.crewAttendances = [];
        for (let i = 0; i < 10; i++) {
            this.crews.push(new CrewAttendanceDto());
            this.stepActions.push(new StepActionDto());
        }
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
        this.jsaClient.get(this.id).subscribe((data) => {
            this.jsa = data;
        });
    }
    save() {
        console.log(this.jsa.date)
        this.jsa.date = new Date(this.jsa.date);
        this.jsa.changedDate = new Date();

        this.crews.forEach((crew) => {
            if (crew.printName || crew.signName || crew.signIn || crew.signOut)
                this.jsa.crewAttendances?.push(crew);
        });

        this.stepActions.forEach((stepAction) => {
            if (stepAction.stepSequnce || stepAction.hazards || stepAction.actions)
                this.jsa.stepActions?.push(stepAction);
        });

        if (this.id > 0) {
            this.jsaClient.update(this.jsa).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
        else {
            this.jsaClient.create(this.jsa).subscribe((data) => {
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
