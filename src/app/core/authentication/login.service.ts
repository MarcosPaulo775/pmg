import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from './session';
import * as URL from '../http/url';

@Injectable({
    providedIn: "root",
})
export class LoginService {

    constructor(
        private http: HttpClient
    ) { }
    /** Autenticação */
    login(user: string, pass: string) {
        let session = new Session();
        const url = URL.server;

        this.http.post(
            URL.server,
            {
                'method': 'auth.create_session',
                'user_name': user,
                'user_pass': pass,
            }

        ).subscribe((data: Session) => {
            console.log(data);
            if(data.error != 'invalid_username_or_password' && data.session != null){
                console.log('Logou ...');
                localStorage.setItem("session", data.session);  
            }else{
                console.log('Errou')
            }
        }, (data) => {
            console.log('Erro: ' + data);
        });
    }
}
