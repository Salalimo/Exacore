import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkoutClient, WorkoutDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './workouts.component.html',
  styleUrls: ['../common.component.css']
})
export class WorkoutsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['workoutId', 'exercise', 'increments', 'units', 'points'];
  dataSource: WorkoutDto[] = [];
  workouts: MatTableDataSource<WorkoutDto>;
  filter: string = '';

  constructor(private workoutClient: WorkoutClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
  }

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.workoutClient.getAll().subscribe((data: WorkoutDto[]) => {
      this.workouts = new MatTableDataSource(data);
      this.workouts.paginator = this.paginator;
      this.workouts.sort = this.sort;
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
        this.workoutClient.delete(id).subscribe((data: WorkoutDto) => {
          this.loadWorkouts();
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('workout');
  }
  edit(id: number) {
    this.router.navigateByUrl('workout/' + id);
  }

 applyFilter() {
    this.workouts.filter = this.filter;
    if (this.workouts.paginator) {
      this.workouts.paginator.firstPage();
    }
  }
}