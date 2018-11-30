import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as URL from '../../../core/http/url';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogMedidasComponent {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogMedidasComponent>,
    @Inject(MAT_DIALOG_DATA) public os: string) { }

  ok: boolean;
  invalid: boolean;
  progress: Subject<number>;
  percentDone: string;
  filename: string;
  /** Upload de arquivo */
  inputFileChange(event) {

    if (event.target.files && event.target.files[0] && event.target.files[0].type === 'application/pdf') {
      const file = event.target.files[0];
      const formData = new FormData;

      let temp = this.os.split(' ');

      this.filename = temp[0] + temp[1] + temp[2] + '.pdf';

      formData.append('file', file, this.filename);

      const req = new HttpRequest('POST', URL.server + '/upload/dimensionColor', formData, {
        reportProgress: true
      });

      this.progress = new Subject<number>();

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          const rest = percentDone % 2;
          if (!rest) {
            this.percentDone = String(percentDone) + '%';
            this.progress.next(percentDone);
          }
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          this.progress.complete();
          this.ok = true;
        }
      });
    } else {
      this.invalid = true;
      this.ok = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(this.filename);
  }

}