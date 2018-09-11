import { Injectable, Input, Output } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as URL from './url';

const url = URL.server_upload;

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) { }


  fileName: string[] = [];

  @Input()
  set setName(fileName: string[]) {
    this.fileName = fileName;
  }

  @Output()
  get getName() {
    return this.fileName;
  }

  public upload(files: Set<File>): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

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
}