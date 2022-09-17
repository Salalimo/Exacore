import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    isAuthenticated(): boolean {
        let str = sessionStorage.getItem('currentUser');
        if (str == '')
            return false;

        let data = JSON.parse(str || '{}');
        let expires = data.expires;
        if (!expires)
            return false;

        let ed = new Date(expires);
        let date = new Date();
        if (ed < date)
            return false;
        else
            return true;
    }

    login(email: string, password: string) {
        let dto: any = {};
        dto.email = email;
        dto.password = password;

        return this.http.post<any>(environment.apiUrl + 'api/account/login', dto)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log(user)
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.clear();
        localStorage.clear();
        this.currentUserSubject.next(new User());
    }

    refreshToken() {
        let user = JSON.parse(sessionStorage.getItem('user') || '{}')
        return this.http.post<any>(`${environment.apiUrl}/api/users/refresh`, {
            'refreshTokenId': user.refreshTokenId,
            'Token': user.token
        }).pipe(tap((token: any) => {
            sessionStorage.setItem('user', JSON.stringify(token));
        }));
    }
}