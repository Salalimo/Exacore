import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertTimeClient, AlertTimeDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './alertTimes.component.html',
  styleUrls: ['../common.component.css']
})
export class AlertTimesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['alertTimeId', 'name', 'action'];
  dataSource: AlertTimeDto[] = [];
  alertTimes: MatTableDataSource<AlertTimeDto>;
  filter: string = '';

  constructor(private alertTimeClient: AlertTimeClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
  }

  ngOnInit() {
    this.loadAlertTimes();
  }

  loadAlertTimes() {
    this.alertTimeClient.getAll().subscribe((data: AlertTimeDto[]) => {
      this.alertTimes = new MatTableDataSource(data);
      this.alertTimes.paginator = this.paginator;
      this.alertTimes.sort = this.sort;
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
        this.alertTimeClient.delete(id).subscribe((data: AlertTimeDto) => {
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('alertTime');
  }
  edit(id: number) {
    console.log(id)
    this.router.navigateByUrl('alertTime/' + id);
  }

 applyFilter() {
    this.alertTimes.filter = this.filter;
    if (this.alertTimes.paginator) {
      this.alertTimes.paginator.firstPage();
    }
  }
}