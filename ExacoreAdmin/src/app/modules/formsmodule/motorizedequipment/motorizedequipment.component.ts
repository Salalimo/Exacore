import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotorizedEquipmentClient, MotorizedEquipmentDto, MotorizedEquipmentOperationalInspectionDto, 
    OperationalDto, MotorizedEquipmentDamageInspectionDto } from '../../../services/api.service';
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
        this.initialize();
    }

    initialize() {
        this.motorizedEquipment.operationalInspection = new MotorizedEquipmentOperationalInspectionDto();
        this.motorizedEquipment.operationalInspection.batteryGauge = new OperationalDto();
        this.motorizedEquipment.operationalInspection.brakes = new OperationalDto();
        this.motorizedEquipment.operationalInspection.chains = new OperationalDto();
        this.motorizedEquipment.operationalInspection.engineOilLevel = new OperationalDto();
        this.motorizedEquipment.operationalInspection.fuelLevelGauge = new OperationalDto();
        this.motorizedEquipment.operationalInspection.headlights = new OperationalDto();
        this.motorizedEquipment.operationalInspection.horn = new OperationalDto();
        this.motorizedEquipment.operationalInspection.hydraulicOilLevel = new OperationalDto();
        this.motorizedEquipment.operationalInspection.hydraulicOutriggers = new OperationalDto();
        this.motorizedEquipment.operationalInspection.hydraulicSideShift = new OperationalDto();
        this.motorizedEquipment.operationalInspection.hydraulicTilt = new OperationalDto();
        this.motorizedEquipment.operationalInspection.oilLevelGauge = new OperationalDto();
        this.motorizedEquipment.operationalInspection.parkingBrake = new OperationalDto();
        this.motorizedEquipment.operationalInspection.reverseLights = new OperationalDto();
        this.motorizedEquipment.operationalInspection.reverseSignal = new OperationalDto();
        this.motorizedEquipment.operationalInspection.runningLights = new OperationalDto();
        this.motorizedEquipment.operationalInspection.seatBelt = new OperationalDto();
        this.motorizedEquipment.operationalInspection.steeringControls = new OperationalDto();
        this.motorizedEquipment.operationalInspection.temperatureGauge = new OperationalDto();
        this.motorizedEquipment.operationalInspection.waterLevelGauge = new OperationalDto();

        this.motorizedEquipment.damageInspection = new MotorizedEquipmentDamageInspectionDto();
        this.motorizedEquipment.damageInspection.attachments = new OperationalDto();
        this.motorizedEquipment.damageInspection.batteryConnectors = new OperationalDto();
        this.motorizedEquipment.damageInspection.forks = new OperationalDto();
        this.motorizedEquipment.damageInspection.guards = new OperationalDto();
        this.motorizedEquipment.damageInspection.leaksDetected = new OperationalDto();
        this.motorizedEquipment.damageInspection.propaneTankLines = new OperationalDto();
        this.motorizedEquipment.damageInspection.safetyDevices = new OperationalDto();
        this.motorizedEquipment.damageInspection.tiresAndWheels = new OperationalDto();
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
