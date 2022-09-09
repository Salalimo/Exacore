import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    register(dto: any) {

        return this.http.post<any>(environment.apiUrl + 'api/account/register', dto)
            .pipe(map(user => {
                if (user && user.token) {
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }
    resendVerification(email: string) {

        let dto: any = {};
        dto.email = email;

        return this.http.post<any>(environment.apiUrl + 'api/account/resendVerification', dto)
            .pipe(map(user => {
                if (user) {
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    activateAccount(email: string, guid: string) {

        let dto: any = {};
        dto.email = email;
        dto.guid = guid;

        return this.http.post<any>(environment.apiUrl + 'api/account/activateAccount', dto)
            .pipe(map(user => {
                if (user) {
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }


    forgotPassword(email: string) {

        let dto: any = {};
        dto.email = email;

        return this.http.post<any>(environment.apiUrl + 'api/account/forgotPassword', dto)
            .pipe(map(user => {
                if (user) {
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    resetPassword(email: string, guid: string, password: string) {

        let dto: any = {};
        dto.email = email;
        dto.guid = guid;
        dto.password = password;

        return this.http.post<any>(environment.apiUrl + 'api/account/resetPassword', dto)
            .pipe(map(user => {
                if (user) {
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }


    getRoles() {
        return this.http.get<any>(environment.apiUrl + 'api/account/roles')
            .pipe(map(user => {
                if (user) {
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

  

}