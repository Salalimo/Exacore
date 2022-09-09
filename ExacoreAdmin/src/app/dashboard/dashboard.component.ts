import { Component, OnInit, ViewChild } from '@angular/core';
import { FormClient, FormDto } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['formId', 'formName', 'changedDate', 'action'];
  dataSource: FormDto[] = [];
  forms: MatTableDataSource<FormDto>;
  filter: string = '';

  constructor(
    private httpClient: HttpClient,
    private formClient: FormClient,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadAlertTimes();
  }

  loadAlertTimes() {
    this.formClient.getAll().subscribe((data: FormDto[]) => {
      this.forms = new MatTableDataSource(data);
      this.forms.paginator = this.paginator;
      this.forms.sort = this.sort;
      this.dataSource = data;
    });
  }

  applyFilter() {
    this.forms.filter = this.filter;
    if (this.forms.paginator) {
      this.forms.paginator.firstPage();
    }
  }

  view(form: FormDto) {

    console.log(form)
    if (form.goodCatches?.length || 0 > 0) {
      this.router.navigateByUrl('forms/goodcatch/' + form.goodCatches[0].goodCatchId);
    }
    else if (form.incidentAlerts?.length || 0 > 0) {
      this.router.navigateByUrl('forms/incidentalert/' + form.incidentAlerts[0].incidentAlertId);
    }
    else if (form.jsas?.length || 0 > 0) {
      this.router.navigateByUrl('forms/jsa/' + form.jsas[0].jsaId);
    }
    else if (form.motorizedEquipments?.length || 0 > 0) {
      this.router.navigateByUrl('forms/motorizedequipment/' + form.motorizedEquipments[0].motorizedEquipmentId);
    }
    else if (form.nearMisses?.length || 0 > 0) {
      this.router.navigateByUrl('forms/nearmiss/' + form.nearMisses[0].nearMissId);
    }
    else if (form.siteSafetyOrientations?.length || 0 > 0) {
      this.router.navigateByUrl('forms/sitesafetyorientation/' + form.siteSafetyOrientations[0].siteSafetyOrientationId);
    }
    else if (form.toolboxMeetings?.length || 0 > 0) {
      this.router.navigateByUrl('forms/toolboxmeeting/' + form.toolboxMeetings[0].toolboxMeetingId);
    }

  }

  edit(form: FormDto) {

    console.log(form)
    if (form.goodCatches?.length || 0 > 0) {
      this.router.navigateByUrl('forms/goodcatch/edit/' + form.goodCatches[0].goodCatchId);
    }
    else if (form.incidentAlerts?.length || 0 > 0) {
      this.router.navigateByUrl('forms/incidentalert/edit/' + form.incidentAlerts[0].incidentAlertId);
    }
    else if (form.jsas?.length || 0 > 0) {
      this.router.navigateByUrl('forms/jsa/edit/' + form.jsas[0].jsaId);
    }
    else if (form.motorizedEquipments?.length || 0 > 0) {
      this.router.navigateByUrl('forms/motorizedequipment/edit/' + form.motorizedEquipments[0].motorizedEquipmentId);
    }
    else if (form.nearMisses?.length || 0 > 0) {
      this.router.navigateByUrl('forms/nearmiss/edit/' + form.nearMisses[0].nearMissId);
    }
    else if (form.siteSafetyOrientations?.length || 0 > 0) {
      this.router.navigateByUrl('forms/sitesafetyorientation/edit/' + form.siteSafetyOrientations[0].siteSafetyOrientationId);
    }
    else if (form.toolboxMeetings?.length || 0 > 0) {
      this.router.navigateByUrl('forms/toolboxmeeting/edit/' + form.toolboxMeetings[0].toolboxMeetingId);
    }

  }

  print(form: FormDto) {
    this.httpClient.get(environment.apiUrl + 'api/form/' + form.formId + '/print', { responseType: 'blob', }).subscribe((data) => {
      var fileURL = URL.createObjectURL(data);
      window.open(fileURL);
    });



  }
}
