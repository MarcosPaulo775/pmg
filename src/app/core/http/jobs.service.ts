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
}