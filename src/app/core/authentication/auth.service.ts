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
        if (localStorage.getItem('avatar')) {
            localStorage.removeItem('avatar');
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

    public users_list_users() {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'users.list_users'
            }

        )

    }

    public users_is_admin(user_id) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'users.is_admin',
                'user_id': user_id
            }
        )
    }

    public portal_get_active_users() {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'portal.get_active_users'
            }

        )
    }

    public users_set_keys(id, key_data) {
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'users.set_keys',
                'id': id,
                'key_data': key_data
            }

        )
    }

    public users_change_password(user_id, old_password, new_password) {
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'users.change_password',
                'user_id': user_id,
                'old_password': old_password,
                'new_password': new_password
            }

        )
    }

    public users_get_user_id(username){
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'users.get_user_id',
                'username': username
            }

        )
    }

}
