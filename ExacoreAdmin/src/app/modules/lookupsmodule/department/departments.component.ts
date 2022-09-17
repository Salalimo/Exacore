import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentClient, DepartmentDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './departments.component.html',
  styleUrls: ['../common.component.css']
})
export class DepartmentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['departmentId', 'name', 'action'];
  dataSource: DepartmentDto[] = [];
  departments: MatTableDataSource<DepartmentDto>;
  filter: string = '';

  constructor(private departmentClient: DepartmentClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
  }

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentClient.getAll().subscribe((data: DepartmentDto[]) => {
      this.departments = new MatTableDataSource(data);
      this.departments.paginator = this.paginator;
      this.departments.sort = this.sort;
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
        this.departmentClient.delete(id).subscribe((data: DepartmentDto) => {
          this.loadDepartments();
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('department');
  }
  edit(id: number) {
    this.router.navigateByUrl('department/' + id);
  }

 applyFilter() {
    this.departments.filter = this.filter;
    if (this.departments.paginator) {
      this.departments.paginator.firstPage();
    }
  }
}