import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlMethodClient, ControlMethodDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './controlMethod.component.html',
  styleUrls: ['../common.component.css']
})
export class ControlMethodComponent implements OnInit, OnDestroy {

  sub: any;
  id: number = 0;
  controlMethod: ControlMethodDto = new ControlMethodDto();

  constructor(private controlMethodClient: ControlMethodClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadControlMethod();
      }
    });
  }

  loadControlMethod() {
    this.controlMethodClient.get(this.id).subscribe((data) => {
      this.controlMethod = data;
    });
  }

  onSubmit() {

    if(this.id > 0) {
      this.controlMethodClient.update(this.controlMethod).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('controlMethods');
      });
    }
    else {
      this.controlMethodClient.create(this.controlMethod).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('controlMethods');
      });
    }
  }
  
  cancel() {
    this.router.navigateByUrl('controlMethods');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
