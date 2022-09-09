import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentClient, DepartmentDto } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['../common.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

  sub: any;
  id: number = 0;
  department: DepartmentDto = new DepartmentDto();

  constructor(private departmentClient: DepartmentClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadDepartment();
      }
    });
  }

  loadDepartment() {
    this.departmentClient.get(this.id).subscribe((data) => {
      this.department = data;
    });
  }

  onSubmit() {

    if(this.id > 0) {
      this.departmentClient.update(this.department).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('departments');
      });
    }
    else {
      this.departmentClient.create(this.department).subscribe((data) => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('departments');
      });
    }
  }
  
  cancel() {
    this.router.navigateByUrl('departments');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
