import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as URL from './url';

@Injectable({
    providedIn: "root",
})
export class ApiService {

    constructor(private http: HttpClient) { }

    /** Salva um novo objeto */
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

    /** Busca a quantidade de item em uma collection */
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

    /** Deleta um objeto */
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

    /** Busca itens de uma collection */
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

    /** atualiza dados de um item */
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

    /** atualiza apenas os campos especificados de um item */
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

    /** Busca um objeto pelo seu ID */
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

    /** Gera um string de uma imagem*/
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

    /** Inicia um fluxo do servidor */
    public hub_start_from_whitepaper_with_files_and_variables(whitepaper_name, input_name, files) {
        return this.http.post(
            URL.server,
            {
                'session': localStorage.getItem('session'),
                'method': 'hub.start_from_whitepaper_with_files_and_variables',
                'whitepaper_name': whitepaper_name,
                'input_name': input_name,
                'files': files
            }
        )
    }

    /** Verifica status de um fluxo no servidor */
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