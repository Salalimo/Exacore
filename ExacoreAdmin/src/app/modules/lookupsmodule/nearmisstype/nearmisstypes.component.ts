import { Component, OnInit, ViewChild } from '@angular/core';
import { NearMissTypeClient, NearMissTypeDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './nearMissTypes.component.html',
  styleUrls: ['../common.component.css']
})
export class NearMissTypesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nearMissTypeId', 'missType', 'action'];
  dataSource: NearMissTypeDto[] = [];
  nearMissTypes: MatTableDataSource<NearMissTypeDto>;
  filter: string = '';

  constructor(private nearMissTypeClient: NearMissTypeClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
  }

  ngOnInit() {
    this.loadNearMissTypes();
  }

  loadNearMissTypes() {
    this.nearMissTypeClient.getAll().subscribe((data: NearMissTypeDto[]) => {
      this.nearMissTypes = new MatTableDataSource(data);
      this.nearMissTypes.paginator = this.paginator;
      this.nearMissTypes.sort = this.sort;
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
        this.nearMissTypeClient.delete(id).subscribe((data: NearMissTypeDto) => {
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('nearMissType');
  }
  edit(id: number) {
    this.router.navigateByUrl('nearMissType/' + id);
  }

 applyFilter() {
    this.nearMissTypes.filter = this.filter;
    if (this.nearMissTypes.paginator) {
      this.nearMissTypes.paginator.firstPage();
    }
  }
}