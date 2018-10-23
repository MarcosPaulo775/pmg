import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from './url';

@Injectable()
export class JobsService {
    constructor(private http: HttpClient) { }

    public custom_objects_list(query) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.list',
                'collection': 'Os',
                'query': query,
                'fields': ' '
            }
        )
    }

    public custom_objects_set_keys(id, data){

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

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.count',
                'collection': 'Os',
                'query': query
            }
        )

    }
}