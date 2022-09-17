import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolboxMeetingClient, ToolboxMeetingDto, ProjectDto, TopicDto, 
    AttendanceDto, ProjectClient } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'toolboxmeetingedit.component.html',
    styleUrls: ['toolboxmeeting.component.css'],
})
export class ToolboxMeetingEditComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    projects: ProjectDto[] = [];
    topics: TopicDto[] = [];
    attendances: AttendanceDto[] = [];
    toolboxMeeting: ToolboxMeetingDto = new ToolboxMeetingDto();

    constructor(
        private toolboxMeetingClient: ToolboxMeetingClient,
        private projectClient: ProjectClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.toolboxMeeting.project = new ProjectDto();
        this.toolboxMeeting.topics = [];
        this.toolboxMeeting.attendances = [];

    }

    ngOnInit(): void {

        this.getProjects();

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            if (this.id > 0) {
                this.loadForm();
            } else {
                this.loadItems(0);
            }
        });
    }
    loadItems(skip: number) {
        for (let i = 0; i < 10; i++) {
            this.topics.push(new TopicDto());
            if (i > (5 - skip))
                continue;
            this.attendances.push(new AttendanceDto());
        }
    }
    getProjects() {
        this.projectClient.getAll().subscribe((data) => {
            this.projects = data;
        });
    }
    loadForm() {
        this.toolboxMeetingClient.get(this.id).subscribe((data) => {
            this.toolboxMeeting = data;
            this.loadItems(data.attendances?.length);
        });
    }
    save() {
        this.topics.forEach((topic) => {
            if (topic.description)
                this.toolboxMeeting.topics?.push(topic);
        });

        this.attendances.forEach((attendance) => {
            if (attendance.name || attendance.company || attendance.comments)
                this.toolboxMeeting.attendances?.push(attendance);
        });

        this.toolboxMeeting.date = new Date(this.toolboxMeeting.date);
        this.toolboxMeeting.changedDate = new Date();
        if (this.id > 0) {
            this.toolboxMeetingClient.update(this.toolboxMeeting).subscribe((data) => {
                this.router.navigateByUrl('dashboard');
            });
        }
        else {
            this.toolboxMeetingClient.create(this.toolboxMeeting).subscribe((data) => {
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
