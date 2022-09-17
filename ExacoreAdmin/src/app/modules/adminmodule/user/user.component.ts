import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserClient, UserDto, ContactDto, RoleDto, RoleClient } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {

  sub: any;
  id: number = 0;
  user: UserDto = new UserDto();
  roles: RoleDto[] = [];

  constructor(private userClient: UserClient,
    private roleClient: RoleClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.user.contact = new ContactDto();
  }

  ngOnInit() {

    this.getRoles();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadUser();
      }
    });
  }

  getRoles() {
    this.roleClient.getAll().subscribe((data: RoleDto[]) => {
      this.roles = data;
    });
  }

  loadUser() {
    this.userClient.get(this.id).subscribe((data: UserDto) => {
      this.user = data;
    });
  }

  onSubmit() {

    if (this.id > 0) {
      this.userClient.update(this.user).subscribe(() => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('users');
      });
    }
    else {
      this.userClient.create(this.user).subscribe(() => {
        this.toastr.success('Save Successful!', '');
        this.router.navigateByUrl('users');
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('users');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
