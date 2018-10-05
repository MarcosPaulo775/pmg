import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from './url';

@Injectable()
export class JobsService {
    constructor(private http: HttpClient) { }

    public custom_objects_list(query) {

        return this.http.post(
            URL.server + '/custom_objects/list',
            {
                'session': localStorage.getItem('session'),
                'collection': 'Os',
                'query': query,
                'fields': ' '
            }
        )
    }

    public custom_objects_set_keys(id, data){

        return this.http.post(
            URL.server + '/custom_objects/set_keys',
            {
                'session': localStorage.getItem('session'),
                'collection': 'Os',
                'id': id,
                'key_data': data
            }
        )

    }

    public custom_objects_count(query){

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