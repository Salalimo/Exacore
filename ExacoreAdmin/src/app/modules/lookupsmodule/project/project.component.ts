import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectClient, ProjectDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['../common.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {

  sub: any;
  id: number = 0;
  project: ProjectDto = new ProjectDto();

  constructor(private projectClient: ProjectClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadProject();
      }
    });
  }

  loadProject() {
    this.projectClient.get(this.id).subscribe((data) => {
      this.project = data;
    });
  }

  onSubmit() {

    if(this.id > 0) {
      this.projectClient.update(this.project).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('projects');
      });
    }
    else {
      this.projectClient.create(this.project).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('projects');
      });
    }
  }
  
  cancel() {
    this.router.navigateByUrl('projects');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
