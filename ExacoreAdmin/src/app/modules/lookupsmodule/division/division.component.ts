import { Component, OnDestroy, OnInit } from '@angular/core';
import { DivisionClient, DivisionDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './division.component.html',
  styleUrls: ['../common.component.css']
})
export class DivisionComponent implements OnInit, OnDestroy {

  sub: any;
  id: number = 0;
  division: DivisionDto = new DivisionDto();

  constructor(private divisionClient: DivisionClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadDivision();
      }
    });
  }

  loadDivision() {
    this.divisionClient.get(this.id).subscribe((data) => {
      this.division = data;
    });
  }

  onSubmit() {

    if(this.id > 0) {
      this.divisionClient.update(this.division).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('divisions');
      });
    }
    else {
      this.divisionClient.create(this.division).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('divisions');
      });
    }
  }
  
  cancel() {
    this.router.navigateByUrl('divisions');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
