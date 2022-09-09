import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './loginmodule/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {
    this.loggedIn = this.authenticationService.isAuthenticated();

  }

  loggedIn = false;
  dark = false;
  appForms = [
    {
      title: 'Home',
      url: '',
      icon: 'document'
    },
    {
      title: 'Good Catch Form',
      url: '/app/forms/goodCatch',
      icon: 'document'
    },
    {
      title: 'Incident Alert Form',
      url: '/app/forms/incidentAlert',
      icon: 'document'
    },
    {
      title: 'JSA ',
      url: '/app/forms/jsa',
      icon: 'document'
    },
    {
      title: 'Near Miss',
      url: '/app/forms/nearMiss',
      icon: 'document'
    },
    {
      title: 'Site Safety Orientation',
      url: '/app/forms/siteSafetyOrientation',
      icon: 'document'
    },
    {
      title: 'Tooldbox Talk',
      url: '/app/forms/toolboxMeeting',
      icon: 'document'
    },
    {
      title: 'Motorized Equipment',
      url: '/app/forms/motorizedEquipment',
      icon: 'document'
    }
  ];

  logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
