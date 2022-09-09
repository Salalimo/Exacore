import { Component, OnDestroy, OnInit } from '@angular/core';
import { NearMissTypeClient, NearMissTypeDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './nearMissType.component.html',
  styleUrls: ['../common.component.css']
})
export class NearMissTypeComponent implements OnInit, OnDestroy {

  sub: any;
  id: number = 0;
  nearMissType: NearMissTypeDto = new NearMissTypeDto();

  constructor(private nearMissTypeClient: NearMissTypeClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadNearMissType();
      }
    });
  }

  loadNearMissType() {
    this.nearMissTypeClient.get(this.id).subscribe((data) => {
      this.nearMissType = data;
    });
  }

  onSubmit() {

    if(this.id > 0) {
      this.nearMissTypeClient.update(this.nearMissType).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('nearMissTypes');
      });
    }
    else {
      this.nearMissTypeClient.create(this.nearMissType).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('nearMissTypes');
      });
    }
  }
  
  cancel() {
    this.router.navigateByUrl('nearMissTypes');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
