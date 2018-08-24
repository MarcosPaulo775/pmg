import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from '../http/url';
@Injectable({
    providedIn: "root",
})
export class ApprovalService {

    constructor(
        private http: HttpClient,
    ) { }
    /** Autenticação */
    getClientes() {
        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.list',
                'collection': 'clientesArtes'
            }
        )
    }

}