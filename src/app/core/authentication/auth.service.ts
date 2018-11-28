import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from '../http/url';
import { Router } from '@angular/router';
@Injectable({
    providedIn: "root",
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    /** Autenticação */
    public create_session(user: string, pass: string) {

        return this.http.post(
            URL.server,
            {
                "method": "auth.create_session",
                "user_name": user,
                "user_pass": pass
            }
        )
    }

    public logout() {

        if (localStorage.getItem('session')) {
            localStorage.removeItem('session');
        }
        this.router.navigate(['/login']);

    }

    public get_current_user() {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'auth.get_current_user'
            }

        )

    }

    public users_list_users(){

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'users.list_users'
            }

        )

    }

    public users_is_admin(){

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'users.is_admin'
            }
        )
    }

    public portal_get_active_users() {
        
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'api.portal.get_active_users'
            }

        )
    }



}
