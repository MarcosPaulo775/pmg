import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from './url';

@Injectable()
export class JobsService {
    constructor(private http: HttpClient) { }

    public custom_objects_list() {

        const url = URL.server;

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.list',
                'collection': 'Os'
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