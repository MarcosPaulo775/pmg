import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from './url';

@Injectable()
export class JobsService {
    constructor(private http: HttpClient) { }

    public custom_objects_list(query) {

        const url = URL.server;

        return this.http.post(
            URL.server + '/custom_objects/list',
            {
                'session': localStorage.getItem('session'),
                'collection': 'Os',
                'query': query
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

    public custom_objects_count(query){

        const url = URL.server

        return this.http.post(
            URL.server + '/custom_objects/count',
            {
                'session': localStorage.getItem('session'),
                'collection': 'Os',
                'query': query
            }
        )


    }
}