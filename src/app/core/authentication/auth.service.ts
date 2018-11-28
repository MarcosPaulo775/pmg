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
    create_session(user: string, pass: string) {

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

     get_current_user() {
 
         return this.http.post(
             URL.server,
             {
                 'session': localStorage.getItem('session'),
                 'method': 'auth.get_current_user'
             }
 
         )
 
     } 
    
}
