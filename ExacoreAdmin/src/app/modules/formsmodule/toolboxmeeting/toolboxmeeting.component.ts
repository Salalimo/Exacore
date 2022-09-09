import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolboxMeetingClient, ToolboxMeetingDto, ProjectDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: 'toolboxmeeting.component.html',
    styleUrls: ['toolboxmeeting.component.css'],
})
export class ToolboxMeetingComponent implements OnInit, OnDestroy {

    id: number = 0;
    sub: any;
    toolboxMeeting: ToolboxMeetingDto = new ToolboxMeetingDto();
    constructor(
        private toolboxMeetingClient: ToolboxMeetingClient,
        private route: ActivatedRoute,
    ) {
        this.toolboxMeeting.project = new ProjectDto();
        this.toolboxMeeting.topics = [];
        this.toolboxMeeting.attendances = [];
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
        this.toolboxMeetingClient.get(this.id).subscribe((data) => {
            this.toolboxMeeting = data;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
