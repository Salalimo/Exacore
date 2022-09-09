import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsaClient, JsaDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'jsa.component.html',
    styleUrls: ['jsa.component.css'],
})
export class JsaComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    jsa: JsaDto = new JsaDto();
    constructor(
        private jsaClient: JsaClient,
        private route: ActivatedRoute,
    ) {
        this.jsa.stepActions = [];
        this.jsa.crewAttendances = [];
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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
