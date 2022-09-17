import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlMethodClient, ControlMethodDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './controlMethods.component.html',
  styleUrls: ['../common.component.css']
})
export class ControlMethodsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['controlMethodId', 'method', 'action'];
  dataSource: ControlMethodDto[] = [];
  controlMethods: MatTableDataSource<ControlMethodDto>;
  filter: string = '';

  constructor(private controlMethodClient: ControlMethodClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
  }

  ngOnInit() {
    this.loadControlMethods();
  }

  loadControlMethods() {
    this.controlMethodClient.getAll().subscribe((data: ControlMethodDto[]) => {
      this.controlMethods = new MatTableDataSource(data);
      this.controlMethods.paginator = this.paginator;
      this.controlMethods.sort = this.sort;
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
        this.controlMethodClient.delete(id).subscribe((data: ControlMethodDto) => {
          this.loadControlMethods();
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('controlMethod');
  }
  edit(id: number) {
    this.router.navigateByUrl('controlMethod/' + id);
  }

 applyFilter() {
    this.controlMethods.filter = this.filter;
    if (this.controlMethods.paginator) {
      this.controlMethods.paginator.firstPage();
    }
  }
}