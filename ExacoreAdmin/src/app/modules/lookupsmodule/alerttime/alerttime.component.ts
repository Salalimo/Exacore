import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertTimeClient, AlertTimeDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './alertTime.component.html',
  styleUrls: ['../common.component.css']
})
export class AlertTimeComponent implements OnInit, OnDestroy {

  sub: any;
  id: number = 0;

  alertTime: AlertTimeDto = new AlertTimeDto();
  @ViewChild('field', { static: false }) field: ElementRef;


  constructor(private alertTimeClient: AlertTimeClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.field.nativeElement.focus();
    }, 200);
  }
  
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadAlertTime();
      }
    });
  }

  loadAlertTime() {
    this.alertTimeClient.get(this.id).subscribe((data) => {
      this.alertTime = data;
    });
  }

  onSubmit() {

    if (this.id > 0) {
      this.alertTimeClient.update(this.alertTime).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('alertTimes');
      });
    }
    else {
      this.alertTimeClient.create(this.alertTime).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('alertTimes');
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('alertTimes');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
