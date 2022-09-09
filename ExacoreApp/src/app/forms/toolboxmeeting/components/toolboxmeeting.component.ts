import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolboxMeetingFormDataService } from '../services/toolboxmeeting.form.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolboxMeetingDto, ToolboxMeetingClient, ProjectDto, ProjectClient
 , TopicDto, AttendanceDto } from '../../../services/api.service';

@Component({
    templateUrl: 'toolboxMeeting.component.html',
    styleUrls: ['../../forms.css']
})
export class ToolboxMeetingComponent implements OnInit, OnDestroy {

    sub: any = {};
    error: string = '';
    toolboxMeetingForm: FormGroup;
    submitted: boolean = false;
    toolboxMeetingId: number = 0;
    toolboxMeeting: ToolboxMeetingDto = new ToolboxMeetingDto();

    projects: ProjectDto[] = [];


    constructor(
        private projectClient: ProjectClient,

        private formDataService: ToolboxMeetingFormDataService,
        private toolboxMeetingClient: ToolboxMeetingClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {

        this.getProjects();

        this.setupForm();
        this.sub = this.route.params.subscribe(params => {
            this.toolboxMeetingId = +params['toolboxMeetingId'];
        });
    }

    get f() { return this.toolboxMeetingForm.controls; }
    get t() { return this.f.topics as FormArray; }
    get a() { return this.f.attendances as FormArray; }


    setupForm() {
        this.toolboxMeetingForm = this.formDataService.buildForm();
    }
    getProjects() {
        this.projectClient.getAll().subscribe((data: ProjectDto[]) => {
            this.projects = data;
        })
    }



    saveForm() {
        this.error = '';

        this.toolboxMeeting = new ToolboxMeetingDto();
        this.toolboxMeeting.supervisor = this.f.supervisor.value;
        this.toolboxMeeting.date = new Date(this.f.date.value);
        this.toolboxMeeting.jobTitle = this.f.jobTitle.value;
        this.toolboxMeeting.employeeId = this.f.employeeId.value;
        this.toolboxMeeting.location = this.f.location.value;
        this.toolboxMeeting.projectNo = this.f.projectNo.value;
        this.toolboxMeeting.numberOfAttendees = this.f.numberOfAttendees.value;
        this.toolboxMeeting.crewNo = this.f.crewNo.value;
        this.toolboxMeeting.projectId = this.f.projectId.value;

        this.toolboxMeeting.topics = [];
        this.t.controls.forEach((element: any) => {
            let topics: TopicDto = new TopicDto();
            topics.description = element.controls.description.value;

            this.toolboxMeeting.topics.push(topics);
        });
        this.toolboxMeeting.attendances = [];
        this.a.controls.forEach((element: any) => {
            let attendances: AttendanceDto = new AttendanceDto();
            attendances.name = element.controls.name.value;
            attendances.company = element.controls.company.value;
            attendances.comments = element.controls.comments.value;

            this.toolboxMeeting.attendances.push(attendances);
        });



    }

    onSubmit() {

        this.submitted = true;
        this.saveForm();

        const controls = this.toolboxMeetingForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                console.log(name, controls[name])
            }
        }

        if (this.toolboxMeetingForm.invalid) {
            console.log(this.toolboxMeetingForm)
            console.log(this.toolboxMeetingForm.invalid)
            this.error = "Please complete all required fields";
            return;
        }

        this.toolboxMeetingClient.create(this.toolboxMeeting).subscribe(() => {
            this.router.navigateByUrl('');
        });
    }

     onChangeTopics(e) {
        const numberOfTopics = e.target.value || 0;
        if (this.t.length < numberOfTopics) {
            for (let i = this.t.length; i < numberOfTopics; i++) {
                this.t.push(this.formBuilder.group({
                    description: ['', Validators.required],

                }));
            }
        } else {
            for (let i = this.t.length; i >= numberOfTopics; i--) {
                this.t.removeAt(i);
            }
        }
    }
     onChangeAttendances(e) {
        const numberOfAttendances = e.target.value || 0;
        if (this.a.length < numberOfAttendances) {
            for (let i = this.a.length; i < numberOfAttendances; i++) {
                this.a.push(this.formBuilder.group({
                    name: ['', Validators.required],
                    company: ['', Validators.required],
                    comments: ['', Validators.required],

                }));
            }
        } else {
            for (let i = this.a.length; i >= numberOfAttendances; i--) {
                this.a.removeAt(i);
            }
        }
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