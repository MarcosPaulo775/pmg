import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from './session';
import * as URL from '../http/url';
import { User } from '../../shared/models/user';

@Injectable({
    providedIn: "root",
})
export class AuthService {

    constructor(
        private http: HttpClient,
    ) { }
    /** Autenticação */
    create_session(user: string, pass: string) {
        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'method': 'auth.create_session',
                'user_name': user,
                'user_pass': pass,
            }
        )
    }

    get_current_user() {

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'auth.get_current_user'
            }

        )

    }
}
