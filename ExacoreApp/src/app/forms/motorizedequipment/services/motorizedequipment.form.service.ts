import { Injectable } from '@angular/core';
import { MotorizedEquipmentDto } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class MotorizedEquipmentFormDataService {

    motorizedEquipment: MotorizedEquipmentDto = new MotorizedEquipmentDto();

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    reset() {
        this.motorizedEquipment = new MotorizedEquipmentDto();
        //this.populateData();
    }

    initialize(gc: MotorizedEquipmentDto) {
        this.motorizedEquipment = gc;
    }

    getForm(): MotorizedEquipmentDto {
        return this.motorizedEquipment;
    }

    populateData() {
        // this.motorizedEquipment.property = 'value';
    }

    setForm(motorizedEquipment: MotorizedEquipmentDto) {
        this.motorizedEquipment = motorizedEquipment;
    }

    buildForm(): FormGroup {

        this.motorizedEquipment = this.getForm();

        let form = this.formBuilder.group({
            ME_model: ['', Validators.required],
            ME_hourMeter: ['', Validators.required],
            ME_inspectedBy: ['', Validators.required],
            ME_date: ['', Validators.required],
            ME_OI_HL_name: ['', Validators.required],
            ME_OI_HL_yesNoNa: ['', Validators.required],
            ME_OI_HL_description: ['', Validators.required],
            ME_OI_headLights: ['', Validators.required],
            ME_OI_RL_name: ['', Validators.required],
            ME_OI_RL_yesNoNa: ['', Validators.required],
            ME_OI_RL_description: ['', Validators.required],
            ME_OI_reverseLights: ['', Validators.required],
            ME_OI_RLA_name: ['', Validators.required],
            ME_OI_RLA_yesNoNa: ['', Validators.required],
            ME_OI_RLA_description: ['', Validators.required],
            ME_OI_runningLightsA: ['', Validators.required],
            ME_OI_PB_name: ['', Validators.required],
            ME_OI_PB_yesNoNa: ['', Validators.required],
            ME_OI_PB_description: ['', Validators.required],
            ME_OI_parkingBrake: ['', Validators.required],
            ME_OI_BG_name: ['', Validators.required],
            ME_OI_BG_yesNoNa: ['', Validators.required],
            ME_OI_BG_description: ['', Validators.required],
            ME_OI_batteryGauge: ['', Validators.required],
            ME_OI_WLG_name: ['', Validators.required],
            ME_OI_WLG_yesNoNa: ['', Validators.required],
            ME_OI_WLG_description: ['', Validators.required],
            ME_OI_waterLevelGauge: ['', Validators.required],
            ME_OI_TG_name: ['', Validators.required],
            ME_OI_TG_yesNoNa: ['', Validators.required],
            ME_OI_TG_description: ['', Validators.required],
            ME_OI_temperatureGauge: ['', Validators.required],
            ME_OI_OLG_name: ['', Validators.required],
            ME_OI_OLG_yesNoNa: ['', Validators.required],
            ME_OI_OLG_description: ['', Validators.required],
            ME_OI_oilLevelGauge: ['', Validators.required],
            ME_OI_FLG_name: ['', Validators.required],
            ME_OI_FLG_yesNoNa: ['', Validators.required],
            ME_OI_FLG_description: ['', Validators.required],
            ME_OI_fuelLevelGauge: ['', Validators.required],
            ME_OI_H_name: ['', Validators.required],
            ME_OI_H_yesNoNa: ['', Validators.required],
            ME_OI_H_description: ['', Validators.required],
            ME_OI_horn: ['', Validators.required],
            ME_OI_RS_name: ['', Validators.required],
            ME_OI_RS_yesNoNa: ['', Validators.required],
            ME_OI_RS_description: ['', Validators.required],
            ME_OI_reverseSignal: ['', Validators.required],
            ME_OI_B_name: ['', Validators.required],
            ME_OI_B_yesNoNa: ['', Validators.required],
            ME_OI_B_description: ['', Validators.required],
            ME_OI_brakes: ['', Validators.required],
            ME_OI_SB_name: ['', Validators.required],
            ME_OI_SB_yesNoNa: ['', Validators.required],
            ME_OI_SB_description: ['', Validators.required],
            ME_OI_seatBelt: ['', Validators.required],
            ME_OI_C_name: ['', Validators.required],
            ME_OI_C_yesNoNa: ['', Validators.required],
            ME_OI_C_description: ['', Validators.required],
            ME_OI_chains: ['', Validators.required],
            ME_OI_HO_name: ['', Validators.required],
            ME_OI_HO_yesNoNa: ['', Validators.required],
            ME_OI_HO_description: ['', Validators.required],
            ME_OI_hydraulicOutriggers: ['', Validators.required],
            ME_OI_HT_name: ['', Validators.required],
            ME_OI_HT_yesNoNa: ['', Validators.required],
            ME_OI_HT_description: ['', Validators.required],
            ME_OI_hydraulicTilt: ['', Validators.required],
            ME_OI_HSS_name: ['', Validators.required],
            ME_OI_HSS_yesNoNa: ['', Validators.required],
            ME_OI_HSS_description: ['', Validators.required],
            ME_OI_hydraulicSideShift: ['', Validators.required],
            ME_OI_EOL_name: ['', Validators.required],
            ME_OI_EOL_yesNoNa: ['', Validators.required],
            ME_OI_EOL_description: ['', Validators.required],
            ME_OI_engineOilLevel: ['', Validators.required],
            ME_OI_HOL_name: ['', Validators.required],
            ME_OI_HOL_yesNoNa: ['', Validators.required],
            ME_OI_HOL_description: ['', Validators.required],
            ME_OI_hydraulicOilLevel: ['', Validators.required],
            ME_OI_SC_name: ['', Validators.required],
            ME_OI_SC_yesNoNa: ['', Validators.required],
            ME_OI_SC_description: ['', Validators.required],
            ME_OI_steeringControls: ['', Validators.required],
            ME_operationalInspection: ['', Validators.required],
            ME_DI_LD_name: ['', Validators.required],
            ME_DI_LD_yesNoNa: ['', Validators.required],
            ME_DI_LD_description: ['', Validators.required],
            ME_DI_leaksDetected: ['', Validators.required],
            ME_DI_TAW_name: ['', Validators.required],
            ME_DI_TAW_yesNoNa: ['', Validators.required],
            ME_DI_TAW_description: ['', Validators.required],
            ME_DI_tiresAndWheels: ['', Validators.required],
            ME_DI_F_name: ['', Validators.required],
            ME_DI_F_yesNoNa: ['', Validators.required],
            ME_DI_F_description: ['', Validators.required],
            ME_DI_forks: ['', Validators.required],
            ME_DI_A_name: ['', Validators.required],
            ME_DI_A_yesNoNa: ['', Validators.required],
            ME_DI_A_description: ['', Validators.required],
            ME_DI_attachments: ['', Validators.required],
            ME_DI_BC_name: ['', Validators.required],
            ME_DI_BC_yesNoNa: ['', Validators.required],
            ME_DI_BC_description: ['', Validators.required],
            ME_DI_batteryConnectors: ['', Validators.required],
            ME_DI_G_name: ['', Validators.required],
            ME_DI_G_yesNoNa: ['', Validators.required],
            ME_DI_G_description: ['', Validators.required],
            ME_DI_guards: ['', Validators.required],
            ME_DI_SD_name: ['', Validators.required],
            ME_DI_SD_yesNoNa: ['', Validators.required],
            ME_DI_SD_description: ['', Validators.required],
            ME_DI_safetyDevices: ['', Validators.required],
            ME_DI_PTL_name: ['', Validators.required],
            ME_DI_PTL_yesNoNa: ['', Validators.required],
            ME_DI_PTL_description: ['', Validators.required],
            ME_DI_propaneTankLines: ['', Validators.required],
            ME_damageInspection: ['', Validators.required],

        });
        return form;
    }


    isDateValid(date) {
        console.log(1)
        try {
            let d = new Date(date);
            if (d + '' == "Invalid Date")
                return false;
            else if (d.getFullYear() > 2099)
                return false;
            else
                return true;
        }
        catch {
            return false;
        }
    }

}