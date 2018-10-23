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

    public custom_objects_count(){

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.count',
                'collection': 'Os',
                'query': ' '
            }
        )

    }
    
     public custom_objects_delete(id: string) {
 
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

    public custom_objects_list(query, field: string) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.list',
                'collection': 'Os',
                'query': query,
                'fields': { '': field }
            }
        )
    }

    public custom_objects_update(os: Os) {

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

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method' : 'custom_objects.set_keys',
                'collection': 'Os',
                'id': id,
                'key_data': data
            }
        )

    }

    public custom_objects_get(id) {
        
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method' : 'custom_objects.get',
                'collection': 'Os',
                'id': id
            }
        )


    }

}