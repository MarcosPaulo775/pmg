import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as URL from '../../../core/http/url';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogMedidasComponent {

  constructor(
    private http: HttpClient,

    public dialogRef: MatDialogRef<DialogMedidasComponent>,
    @Inject(MAT_DIALOG_DATA) public os: string
  ) { }

  invalid: boolean;
  size: boolean;
  progress: Subject<number>;
  filename: string;

  public uploader: FileUploader = new FileUploader({ url: URL.server + '/upload/dimensionColor' });
  public hasBaseDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  /** Upload de arquivo */
  uploadAll(e: any) {
    if (this.uploader.queue[0].file.size < 300 * 1024 * 1024) {
      if (
        this.uploader.queue
        && this.uploader.queue[0]
        && this.uploader.queue[0].file.type === 'application/pdf'
      ) {
        this.uploader.queue[0].withCredentials = false;
        this.uploader.authToken = localStorage.getItem('session');

        let temp = this.os.split(' ');

        this.filename = temp[0] + temp[1] + temp[2] + '.pdf';

        this.uploader.queue[0].file.name = this.filename;

        this.uploader.uploadAll();
      } else {
        this.invalid = true;
      }
    } else {
      this.size = true;
    }
  }

  /** Fecha a janela */
  onNoClick(): void {
    this.dialogRef.close(this.filename);
  }

}