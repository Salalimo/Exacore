import { Injectable } from '@angular/core';
import { ToolboxMeetingDto } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class ToolboxMeetingFormDataService {

    toolboxMeeting: ToolboxMeetingDto = new ToolboxMeetingDto();

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    reset() {
        this.toolboxMeeting = new ToolboxMeetingDto();
        //this.populateData();
    }

    initialize(gc: ToolboxMeetingDto) {
        this.toolboxMeeting = gc;
    }

    getForm(): ToolboxMeetingDto {
        return this.toolboxMeeting;
    }

    populateData() {
        // this.toolboxMeeting.property = 'value';
    }

    setForm(toolboxMeeting: ToolboxMeetingDto) {
        this.toolboxMeeting = toolboxMeeting;
    }

    buildForm(): FormGroup {

        this.toolboxMeeting = this.getForm();

        let form = this.formBuilder.group({
            supervisor: [this.toolboxMeeting.supervisor, Validators.required],
            date: [this.toolboxMeeting.date, Validators.required],
            jobTitle: [this.toolboxMeeting.jobTitle, Validators.required],
            employeeId: [this.toolboxMeeting.employeeId, Validators.required],
            location: [this.toolboxMeeting.location, Validators.required],
            projectNo: [this.toolboxMeeting.projectNo, Validators.required],
            numberOfAttendees: [this.toolboxMeeting.numberOfAttendees, Validators.required],
            crewNo: [this.toolboxMeeting.crewNo, Validators.required],
            topics: new FormArray([]),
            attendances: new FormArray([]),
            projectId: [this.toolboxMeeting.projectId, Validators.required],

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