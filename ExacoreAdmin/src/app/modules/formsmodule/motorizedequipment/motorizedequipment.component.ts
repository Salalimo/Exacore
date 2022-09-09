import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotorizedEquipmentClient, MotorizedEquipmentDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'motorizedequipment.component.html',
    styleUrls: ['motorizedequipment.component.css'],
})
export class MotorizedEquipmentComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    motorizedEquipment: MotorizedEquipmentDto = new MotorizedEquipmentDto();
    constructor(
        private motorizedEquipmentClient: MotorizedEquipmentClient,
        private route: ActivatedRoute,
    ) {
        //this.motorizedEquipment.operationals = [];
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
        this.motorizedEquipmentClient.get(this.id).subscribe((data) => {
            this.motorizedEquipment = data;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
