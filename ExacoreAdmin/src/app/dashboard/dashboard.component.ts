import { Component, OnInit, ViewChild } from '@angular/core';
import { FormClient, FormDto } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../modules/loginmodule/models/user';
import { RoleEnum } from '../modules/loginmodule/models/RoleEnum';
import { AuthenticationService } from '../modules/loginmodule/services/authentication.service';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  enum = RoleEnum;
  isSuperAdmin: boolean;
  user: User = new User();
  displayedColumns: string[] = ['formId', 'formName', 'changedDate', 'action'];
  dataSource: FormDto[] = [];
  forms: MatTableDataSource<FormDto>;
  filter: string = '';
  selectedForm: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient,
    private formClient: FormClient,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.loadAlertTimes();
    this.isSuperAdmin = this.authenticationService.currentUserValue.role == this.enum.SUPERADMIN;
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
    let id = 0;
    if (form.goodCatches?.length || 0 > 0) {
      id = form.goodCatches[0].goodCatchId;
    }
    else if (form.incidentAlerts?.length || 0 > 0) {
      id = form.incidentAlerts[0].incidentAlertId;
    }
    else if (form.jsas?.length || 0 > 0) {
      id = form.jsas[0].jsaId;
    }
    else if (form.motorizedEquipments?.length || 0 > 0) {
      id = form.motorizedEquipments[0].motorizedEquipmentId;
    }
    else if (form.nearMisses?.length || 0 > 0) {
      id = form.nearMisses[0].nearMissId;
    }
    else if (form.siteSafetyOrientations?.length || 0 > 0) {
      id = form.siteSafetyOrientations[0].siteSafetyOrientationId;
    }
    else if (form.toolboxMeetings?.length || 0 > 0) {
      id = form.toolboxMeetings[0].toolboxMeetingId;
    }

    this.httpClient.get(environment.apiUrl + 'api/form/' + id + '/print', { responseType: 'blob', }).subscribe((data) => {
      var fileURL = URL.createObjectURL(data);
      window.open(fileURL);
    });
  }
  addForm() {
    if (this.selectedForm == '') {

    }


    if (this.selectedForm == 'Good Catch Form') {
      this.router.navigateByUrl('forms/goodcatch');
    }
    else if (this.selectedForm == 'Incident Alert') {
      this.router.navigateByUrl('forms/incidentalert');
    }
    else if (this.selectedForm == 'JSA') {
      this.router.navigateByUrl('forms/jsa');
    }
    else if (this.selectedForm == 'Near Miss') {
      this.router.navigateByUrl('forms/nearmiss');
    }
    else if (this.selectedForm == 'Site Safety Orientation') {
      this.router.navigateByUrl('forms/sitesafetyorientation');
    }
    else if (this.selectedForm == 'Tooldbox Talk') {
      this.router.navigateByUrl('forms/toolboxmeeting');
    }
    else if (this.selectedForm == 'Motorized Equipment') {
      this.router.navigateByUrl('forms/motorizedequipment');
    }

  }
}
