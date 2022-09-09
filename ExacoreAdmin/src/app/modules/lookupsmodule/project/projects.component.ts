import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectClient, ProjectDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['../common.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['projectId', 'name', 'action'];
  dataSource: ProjectDto[] = [];
  projects: MatTableDataSource<ProjectDto>;
  filter: string = '';

  constructor(private projectClient: ProjectClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectClient.getAll().subscribe((data: ProjectDto[]) => {
      this.projects = new MatTableDataSource(data);
      this.projects.paginator = this.paginator;
      this.projects.sort = this.sort;
      this.dataSource = data;
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: { Id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.projectClient.delete(id).subscribe((data: ProjectDto) => {
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('project');
  }
  edit(id: number) {
    this.router.navigateByUrl('project/' + id);
  }

 applyFilter() {
    this.projects.filter = this.filter;
    if (this.projects.paginator) {
      this.projects.paginator.firstPage();
    }
  }
}