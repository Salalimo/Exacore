import { Component, OnInit, ViewChild } from '@angular/core';
import { UserClient, UserDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filter: string = '';
  dataSource: UserDto[] = [];
  users: MatTableDataSource<UserDto>;
  displayedColumns: string[] = ['userId', 'email', 'role', 'contact', 'action'];

  deleting: boolean = false;

  constructor(private userClient: UserClient,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userClient.getAll().subscribe((data: UserDto[]) => {
      this.users = new MatTableDataSource(data);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
      this.dataSource = data;
    });
  }

  delete(id: number) {
    this.deleting = true;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: { Id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleting = false;
      if (result) {
        this.userClient.delete(id).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('user');
  }
  edit(id: number) {
    this.router.navigateByUrl('user/' + id);
  }

  applyFilter() {
    this.users.filter = this.filter;
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }
}