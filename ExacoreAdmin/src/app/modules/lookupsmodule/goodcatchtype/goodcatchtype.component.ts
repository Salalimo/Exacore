import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoodCatchTypeClient, GoodCatchTypeDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './goodCatchType.component.html',
  styleUrls: ['../common.component.css']
})
export class GoodCatchTypeComponent implements OnInit, OnDestroy {

  sub: any;
  id: number = 0;
  goodCatchType: GoodCatchTypeDto = new GoodCatchTypeDto();
  @ViewChild('field', { static: false }) field: ElementRef;

  constructor(private goodCatchTypeClient: GoodCatchTypeClient,
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
        this.loadGoodCatchType();
      }
    });
  }

  loadGoodCatchType() {
    this.goodCatchTypeClient.get(this.id).subscribe((data) => {
      this.goodCatchType = data;
    });
  }

  onSubmit() {

    if(this.id > 0) {
      this.goodCatchTypeClient.update(this.goodCatchType).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('goodCatchTypes');
      });
    }
    else {
      this.goodCatchTypeClient.create(this.goodCatchType).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('goodCatchTypes');
      });
    }
  }
  
  cancel() {
    this.router.navigateByUrl('goodCatchTypes');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
