import { Component, OnInit, ViewChild } from '@angular/core';
import { DivisionClient, DivisionDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './divisions.component.html',
  styleUrls: ['../common.component.css']
})
export class DivisionsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['divisionId', 'name', 'action'];
  dataSource: DivisionDto[] = [];
  divisions: MatTableDataSource<DivisionDto>;
  filter: string = '';

  constructor(private divisionClient: DivisionClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
  }

  ngOnInit() {
    this.loadDivisions();
  }

  loadDivisions() {
    this.divisionClient.getAll().subscribe((data: DivisionDto[]) => {
      this.divisions = new MatTableDataSource(data);
      this.divisions.paginator = this.paginator;
      this.divisions.sort = this.sort;
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
        this.divisionClient.delete(id).subscribe((data: DivisionDto) => {
          this.loadDivisions();
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('division');
  }
  edit(id: number) {
    console.log(id)
    this.router.navigateByUrl('division/' + id);
  }

 applyFilter() {
    this.divisions.filter = this.filter;
    if (this.divisions.paginator) {
      this.divisions.paginator.firstPage();
    }
  }
}