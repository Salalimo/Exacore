import { Component, OnInit, ViewChild } from '@angular/core';
import { GoodCatchTypeClient, GoodCatchTypeDto } from '../../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../shared/modals/delete.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './goodCatchTypes.component.html',
  styleUrls: ['../common.component.css']
})
export class GoodCatchTypesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['goodCatchTypeId', 'catchType', 'action'];
  dataSource: GoodCatchTypeDto[] = [];
  goodCatchTypes: MatTableDataSource<GoodCatchTypeDto>;
  filter: string = '';

  constructor(private goodCatchTypeClient: GoodCatchTypeClient,
        public dialog: MatDialog,
        private router: Router,
    ) {
  }

  ngOnInit() {
    this.loadGoodCatchTypes();
  }

  loadGoodCatchTypes() {
    this.goodCatchTypeClient.getAll().subscribe((data: GoodCatchTypeDto[]) => {
      this.goodCatchTypes = new MatTableDataSource(data);
      this.goodCatchTypes.paginator = this.paginator;
      this.goodCatchTypes.sort = this.sort;
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
        this.goodCatchTypeClient.delete(id).subscribe((data: GoodCatchTypeDto) => {
          this.loadGoodCatchTypes();
        });
      }
    });
  }

  add() {
    this.router.navigateByUrl('goodCatchType');
  }
  edit(id: number) {
    this.router.navigateByUrl('goodCatchType/' + id);
  }

 applyFilter() {
    this.goodCatchTypes.filter = this.filter;
    if (this.goodCatchTypes.paginator) {
      this.goodCatchTypes.paginator.firstPage();
    }
  }
}