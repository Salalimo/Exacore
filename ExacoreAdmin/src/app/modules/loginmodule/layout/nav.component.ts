import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { RoleEnum } from '../models/RoleEnum';
import { User } from '../models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {

  isUser: boolean;
  isSuperAdmin: boolean;
  role: string = '';
  user: User = new User();
  enum = RoleEnum;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.isSuperAdmin = this.authenticationService.currentUserValue.role == this.enum.SUPERADMIN;
    this.isUser = this.authenticationService.currentUserValue.role == this.enum.USER;

    if (this.authenticationService.currentUserValue != null)
      this.role = this.authenticationService.currentUserValue.role;
    else
      this.role = '';
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  goto() {

    if (this.role == '')
      this.router.navigate(['/login']);


  }
}
