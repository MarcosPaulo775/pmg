import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from './url';
import { Os } from '../../shared/models/os';

@Injectable()
export class OsService {

    constructor(private http: HttpClient) { }

    public start_from_whitepaper(nomedoCliente: string, email: string, numOS: string, versao: string, arquivo: string) {

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'hub.start_from_whitepaper',
                'whitepaper_name': 'API_aprovacao',
                'input_name': 'proofscope',
                'variables': {
                    'nomedoCliente': nomedoCliente,
                    'email': email,
                    'numOS': numOS,
                    'versao': versao,
                    'arquivo': arquivo
                }
            }
        )

    }

    public custom_objects_create(os: Os) {

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.create',
                'collection': 'Os',
                'data': os
            }
        )

    }

    public custom_objects_count() {

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.count',
                'collection': 'Os'
            }
        )

    }

    public custom_objects_delete(id: string) {

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.delete',
                'collection': 'Os',
                'id': id
            }
        )

    }

    public custom_objects_list(query: number, field: string) {

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.list',
                'collection': 'Os',
                'query': ['os', 'equal to', query],
                'fields': { '': field }
            }
        )
    }

    public custom_objects_update(os: Os) {

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.update',
                'collection': 'Os',
                'data': os
            }
        )

    }

    public custom_objects_set_keys(id, data){

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.set_keys',
                'collection': 'Os',
                'id': id,
                'key_data': data
            }
        )

    }

}