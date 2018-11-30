import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from './url';

@Injectable({
    providedIn: "root",
})
export class ApiService {

    constructor(private http: HttpClient) { }

    public custom_objects_create(collection, data) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.create',
                'collection': collection,
                'data': data
            }
        )

    }

    public custom_objects_count(collection, query) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.count',
                'collection': collection,
                'query': query
            }
        )

    }

    public custom_objects_delete(collection, id) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.delete',
                'collection': collection,
                'id': id
            }
        )

    }

    public custom_objects_list(collection, query, field) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.list',
                'collection': collection,
                'query': query,
                'fields': field
            }
        )
    }

    public custom_objects_update(collection, data) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.update',
                'collection': collection,
                'data': data
            }
        )

    }

    public custom_objects_set_keys(collection, id, data) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.set_keys',
                'collection': collection,
                'id': id,
                'key_data': data
            }
        )

    }

    public custom_objects_get(collection, id) {

        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'custom_objects.get',
                'collection': collection,
                'id': id
            }
        )
    }

    public metadata_get_preview(file, page, size) {
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'metadata.get_preview',
                'file': file,
                'page': page,
                'size': size,
            }
        )
    }

    public hub_start_from_whitepaper_with_files_and_variables(whitepaper_name, input_name, files, variables) {
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'hub.start_from_whitepaper_with_files_and_variables',
                'whitepaper_name': whitepaper_name,
                'input_name': input_name,
                'files': files,
                'variables': variables
            }
        )
    }

    public hub_get_waiting_room_of_workable(workable_id) {
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'hub.get_waiting_room_of_workable',
                'workable_id': workable_id
            }
        )

    }

}