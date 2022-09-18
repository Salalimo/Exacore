import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { RoleEnum } from '../models/RoleEnum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const currentUser = this.authenticationService.currentUserValue;
        
        let value = this.authenticationService.isAuthenticated();
        console.log(value)
        if (!value) {
            //console.log(1)
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        
        if (currentUser.role == RoleEnum.SUPERADMIN || !route.data.role) {
            //console.log(2)
            return true;
        }

        if (currentUser.role == RoleEnum.USER) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            //console.log(3)
            return false;
        }

        let routeRole = route.data.role;
        if (routeRole == RoleEnum.SUPERADMIN) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            //console.log(4)
            return false;
        }
        //console.log(5)
        // console.log(route.data, currentUser.role)
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}