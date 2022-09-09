import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotorizedEquipmentFormDataService } from '../services/motorizedequipment.form.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MotorizedEquipmentDto, MotorizedEquipmentClient  } from '../../../services/api.service';

@Component({
    templateUrl: 'motorizedEquipment.component.html',
    styleUrls: ['../../forms.css']
})
export class MotorizedEquipmentComponent implements OnInit, OnDestroy {

    sub: any = {};
    error: string = '';
    motorizedEquipmentForm: FormGroup;
    submitted: boolean = false;
    motorizedEquipmentId: number = 0;
    motorizedEquipment: MotorizedEquipmentDto = new MotorizedEquipmentDto();



    constructor(

        private formDataService: MotorizedEquipmentFormDataService,
        private motorizedEquipmentClient: MotorizedEquipmentClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {


        this.setupForm();
        this.sub = this.route.params.subscribe(params => {
            this.motorizedEquipmentId = +params['motorizedEquipmentId'];
        });
    }

    get f() { return this.motorizedEquipmentForm.controls; }


    setupForm() {
        this.motorizedEquipmentForm = this.formDataService.buildForm();
    }


    saveForm() {
        this.error = '';

        this.motorizedEquipment = new MotorizedEquipmentDto();
        this.motorizedEquipment.model = this.f.ME_model.value;
        this.motorizedEquipment.hourMeter = this.f.ME_hourMeter.value;
        this.motorizedEquipment.inspectedBy = this.f.ME_inspectedBy.value;
        this.motorizedEquipment.date = new Date(this.f.date.value);
        this.motorizedEquipment.operationalInspection.headlights.name = this.f.ME_OI_HL_name.value;
        this.motorizedEquipment.operationalInspection.headlights.yesNoNa = this.f.ME_OI_HL_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.headlights.description = this.f.ME_OI_HL_description.value;
        this.motorizedEquipment.operationalInspection.headlights = this.f.ME_OI_headLights.value;
        this.motorizedEquipment.operationalInspection.reverseLights.name = this.f.ME_OI_RL_name.value;
        this.motorizedEquipment.operationalInspection.reverseLights.yesNoNa = this.f.ME_OI_RL_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.reverseLights.description = this.f.ME_OI_RL_description.value;
        this.motorizedEquipment.operationalInspection.reverseLights = this.f.ME_OI_reverseLights.value;
        this.motorizedEquipment.operationalInspection.runningLights.name = this.f.ME_OI_RLA_name.value;
        this.motorizedEquipment.operationalInspection.runningLights.yesNoNa = this.f.ME_OI_RLA_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.runningLights.description = this.f.ME_OI_RLA_description.value;
        this.motorizedEquipment.operationalInspection.runningLights = this.f.ME_OI_runningLightsA.value;
        this.motorizedEquipment.operationalInspection.parkingBrake.name = this.f.ME_OI_PB_name.value;
        this.motorizedEquipment.operationalInspection.parkingBrake.yesNoNa = this.f.ME_OI_PB_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.parkingBrake.description = this.f.ME_OI_PB_description.value;
        this.motorizedEquipment.operationalInspection.parkingBrake = this.f.ME_OI_parkingBrake.value;
        this.motorizedEquipment.operationalInspection.batteryGauge.name = this.f.ME_OI_BG_name.value;
        this.motorizedEquipment.operationalInspection.batteryGauge.yesNoNa = this.f.ME_OI_BG_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.batteryGauge.description = this.f.ME_OI_BG_description.value;
        this.motorizedEquipment.operationalInspection.batteryGauge = this.f.ME_OI_batteryGauge.value;
        this.motorizedEquipment.operationalInspection.waterLevelGauge.name = this.f.ME_OI_WLG_name.value;
        this.motorizedEquipment.operationalInspection.waterLevelGauge.yesNoNa = this.f.ME_OI_WLG_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.waterLevelGauge.description = this.f.ME_OI_WLG_description.value;
        this.motorizedEquipment.operationalInspection.waterLevelGauge = this.f.ME_OI_waterLevelGauge.value;
        this.motorizedEquipment.operationalInspection.temperatureGauge.name = this.f.ME_OI_TG_name.value;
        this.motorizedEquipment.operationalInspection.temperatureGauge.yesNoNa = this.f.ME_OI_TG_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.temperatureGauge.description = this.f.ME_OI_TG_description.value;
        this.motorizedEquipment.operationalInspection.temperatureGauge = this.f.ME_OI_temperatureGauge.value;
        this.motorizedEquipment.operationalInspection.oilLevelGauge.name = this.f.ME_OI_OLG_name.value;
        this.motorizedEquipment.operationalInspection.oilLevelGauge.yesNoNa = this.f.ME_OI_OLG_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.oilLevelGauge.description = this.f.ME_OI_OLG_description.value;
        this.motorizedEquipment.operationalInspection.oilLevelGauge = this.f.ME_OI_oilLevelGauge.value;
        this.motorizedEquipment.operationalInspection.fuelLevelGauge.name = this.f.ME_OI_FLG_name.value;
        this.motorizedEquipment.operationalInspection.fuelLevelGauge.yesNoNa = this.f.ME_OI_FLG_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.fuelLevelGauge.description = this.f.ME_OI_FLG_description.value;
        this.motorizedEquipment.operationalInspection.fuelLevelGauge = this.f.ME_OI_fuelLevelGauge.value;
        this.motorizedEquipment.operationalInspection.horn.name = this.f.ME_OI_H_name.value;
        this.motorizedEquipment.operationalInspection.horn.yesNoNa = this.f.ME_OI_H_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.horn.description = this.f.ME_OI_H_description.value;
        this.motorizedEquipment.operationalInspection.horn = this.f.ME_OI_horn.value;
        this.motorizedEquipment.operationalInspection.reverseSignal.name = this.f.ME_OI_RS_name.value;
        this.motorizedEquipment.operationalInspection.reverseSignal.yesNoNa = this.f.ME_OI_RS_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.reverseSignal.description = this.f.ME_OI_RS_description.value;
        this.motorizedEquipment.operationalInspection.reverseSignal = this.f.ME_OI_reverseSignal.value;
        this.motorizedEquipment.operationalInspection.brakes.name = this.f.ME_OI_B_name.value;
        this.motorizedEquipment.operationalInspection.brakes.yesNoNa = this.f.ME_OI_B_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.brakes.description = this.f.ME_OI_B_description.value;
        this.motorizedEquipment.operationalInspection.brakes = this.f.ME_OI_brakes.value;
        this.motorizedEquipment.operationalInspection.seatBelt.name = this.f.ME_OI_SB_name.value;
        this.motorizedEquipment.operationalInspection.seatBelt.yesNoNa = this.f.ME_OI_SB_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.seatBelt.description = this.f.ME_OI_SB_description.value;
        this.motorizedEquipment.operationalInspection.seatBelt = this.f.ME_OI_seatBelt.value;
        this.motorizedEquipment.operationalInspection.chains.name = this.f.ME_OI_C_name.value;
        this.motorizedEquipment.operationalInspection.chains.yesNoNa = this.f.ME_OI_C_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.chains.description = this.f.ME_OI_C_description.value;
        this.motorizedEquipment.operationalInspection.chains = this.f.ME_OI_chains.value;
        this.motorizedEquipment.operationalInspection.hydraulicOutriggers.name = this.f.ME_OI_HO_name.value;
        this.motorizedEquipment.operationalInspection.hydraulicOutriggers.yesNoNa = this.f.ME_OI_HO_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.hydraulicOutriggers.description = this.f.ME_OI_HO_description.value;
        this.motorizedEquipment.operationalInspection.hydraulicOutriggers = this.f.ME_OI_hydraulicOutriggers.value;
        this.motorizedEquipment.operationalInspection.hydraulicTilt.name = this.f.ME_OI_HT_name.value;
        this.motorizedEquipment.operationalInspection.hydraulicTilt.yesNoNa = this.f.ME_OI_HT_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.hydraulicTilt.description = this.f.ME_OI_HT_description.value;
        this.motorizedEquipment.operationalInspection.hydraulicTilt = this.f.ME_OI_hydraulicTilt.value;
        this.motorizedEquipment.operationalInspection.hydraulicSideShift.name = this.f.ME_OI_HSS_name.value;
        this.motorizedEquipment.operationalInspection.hydraulicSideShift.yesNoNa = this.f.ME_OI_HSS_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.hydraulicSideShift.description = this.f.ME_OI_HSS_description.value;
        this.motorizedEquipment.operationalInspection.hydraulicSideShift = this.f.ME_OI_hydraulicSideShift.value;
        this.motorizedEquipment.operationalInspection.engineOilLevel.name = this.f.ME_OI_EOL_name.value;
        this.motorizedEquipment.operationalInspection.engineOilLevel.yesNoNa = this.f.ME_OI_EOL_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.engineOilLevel.description = this.f.ME_OI_EOL_description.value;
        this.motorizedEquipment.operationalInspection.engineOilLevel = this.f.ME_OI_engineOilLevel.value;
        this.motorizedEquipment.operationalInspection.hydraulicOilLevel.name = this.f.ME_OI_HOL_name.value;
        this.motorizedEquipment.operationalInspection.hydraulicOilLevel.yesNoNa = this.f.ME_OI_HOL_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.hydraulicOilLevel.description = this.f.ME_OI_HOL_description.value;
        this.motorizedEquipment.operationalInspection.hydraulicOilLevel = this.f.ME_OI_hydraulicOilLevel.value;
        this.motorizedEquipment.operationalInspection.steeringControls.name = this.f.ME_OI_SC_name.value;
        this.motorizedEquipment.operationalInspection.steeringControls.yesNoNa = this.f.ME_OI_SC_yesNoNa.value;
        this.motorizedEquipment.operationalInspection.steeringControls.description = this.f.ME_OI_SC_description.value;
        this.motorizedEquipment.operationalInspection.steeringControls = this.f.ME_OI_steeringControls.value;
        this.motorizedEquipment.operationalInspection = this.f.ME_operationalInspection.value;
        this.motorizedEquipment.damageInspection.leaksDetected.name = this.f.ME_DI_LD_name.value;
        this.motorizedEquipment.damageInspection.leaksDetected.yesNoNa = this.f.ME_DI_LD_yesNoNa.value;
        this.motorizedEquipment.damageInspection.leaksDetected.description = this.f.ME_DI_LD_description.value;
        this.motorizedEquipment.damageInspection.leaksDetected = this.f.ME_DI_leaksDetected.value;
        this.motorizedEquipment.damageInspection.tiresAndWheels.name = this.f.ME_DI_TAW_name.value;
        this.motorizedEquipment.damageInspection.tiresAndWheels.yesNoNa = this.f.ME_DI_TAW_yesNoNa.value;
        this.motorizedEquipment.damageInspection.tiresAndWheels.description = this.f.ME_DI_TAW_description.value;
        this.motorizedEquipment.damageInspection.tiresAndWheels = this.f.ME_DI_tiresAndWheels.value;
        this.motorizedEquipment.damageInspection.forks.name = this.f.ME_DI_F_name.value;
        this.motorizedEquipment.damageInspection.forks.yesNoNa = this.f.ME_DI_F_yesNoNa.value;
        this.motorizedEquipment.damageInspection.forks.description = this.f.ME_DI_F_description.value;
        this.motorizedEquipment.damageInspection.forks = this.f.ME_DI_forks.value;
        this.motorizedEquipment.damageInspection.attachments.name = this.f.ME_DI_A_name.value;
        this.motorizedEquipment.damageInspection.attachments.yesNoNa = this.f.ME_DI_A_yesNoNa.value;
        this.motorizedEquipment.damageInspection.attachments.description = this.f.ME_DI_A_description.value;
        this.motorizedEquipment.damageInspection.attachments = this.f.ME_DI_attachments.value;
        this.motorizedEquipment.damageInspection.batteryConnectors.name = this.f.ME_DI_BC_name.value;
        this.motorizedEquipment.damageInspection.batteryConnectors.yesNoNa = this.f.ME_DI_BC_yesNoNa.value;
        this.motorizedEquipment.damageInspection.batteryConnectors.description = this.f.ME_DI_BC_description.value;
        this.motorizedEquipment.damageInspection.batteryConnectors = this.f.ME_DI_batteryConnectors.value;
        this.motorizedEquipment.damageInspection.guards.name = this.f.ME_DI_G_name.value;
        this.motorizedEquipment.damageInspection.guards.yesNoNa = this.f.ME_DI_G_yesNoNa.value;
        this.motorizedEquipment.damageInspection.guards.description = this.f.ME_DI_G_description.value;
        this.motorizedEquipment.damageInspection.guards = this.f.ME_DI_guards.value;
        this.motorizedEquipment.damageInspection.safetyDevices.name = this.f.ME_DI_SD_name.value;
        this.motorizedEquipment.damageInspection.safetyDevices.yesNoNa = this.f.ME_DI_SD_yesNoNa.value;
        this.motorizedEquipment.damageInspection.safetyDevices.description = this.f.ME_DI_SD_description.value;
        this.motorizedEquipment.damageInspection.safetyDevices = this.f.ME_DI_safetyDevices.value;
        this.motorizedEquipment.damageInspection.propaneTankLines.name = this.f.ME_DI_PTL_name.value;
        this.motorizedEquipment.damageInspection.propaneTankLines.yesNoNa = this.f.ME_DI_PTL_yesNoNa.value;
        this.motorizedEquipment.damageInspection.propaneTankLines.description = this.f.ME_DI_PTL_description.value;
        this.motorizedEquipment.damageInspection.propaneTankLines = this.f.ME_DI_propaneTankLines.value;
        this.motorizedEquipment.damageInspection = this.f.ME_damageInspection.value;




    }

    onSubmit() {

        this.submitted = true;
        this.saveForm();

        const controls = this.motorizedEquipmentForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                console.log(name, controls[name])
            }
        }

        if (this.motorizedEquipmentForm.invalid) {
            console.log(this.motorizedEquipmentForm)
            console.log(this.motorizedEquipmentForm.invalid)
            this.error = "Please complete all required fields";
            return;
        }

        this.motorizedEquipmentClient.create(this.motorizedEquipment).subscribe(() => {
            this.router.navigateByUrl('');
        });
    }



    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isBirthDateValid(date) {
        try {
            if (!date)
                return true;
            let d = new Date(date);
            if (d + '' == "Invalid Date")
                return false;
            else if (d > new Date() || d.getFullYear() < 1900)
                return false;
            else
                return true;
        }
        catch {
            console.log(2);
            return false;
        }
    }
}