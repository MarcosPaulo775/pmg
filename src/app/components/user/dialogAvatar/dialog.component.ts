import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from 'src/app/shared/models/user';
import * as URL from '../../../core/http/url';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogAvatarComponent {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) { }

  invalid: boolean;
  size: boolean;
  progress: Subject<number>;
  filename: string;

  public uploader: FileUploader = new FileUploader({ url: URL.server + '/upload/avatar' });
  public hasBaseDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  /** Upload de arquivo */
  uploadAll(e: any) {
    if (this.uploader.queue[0].file.size < 5 * 1024 * 1024) {
      if (
        this.uploader.queue
        && this.uploader.queue[0]
        && (this.uploader.queue[0].file.type === 'image/png' || this.uploader.queue[0].file.type === 'image/jpeg')
      ) {
        this.uploader.queue[0].withCredentials = false;
        this.uploader.authToken = localStorage.getItem('session');

        if (this.uploader.queue[0].file.type === 'image/png') {
          this.filename = this.user._id + '.png';
        } else if (this.uploader.queue[0].file.type === 'image/jpeg') {
          this.filename = this.user._id + '.jpg';
        }

        this.uploader.queue[0].file.name = this.filename;
        this.uploader.uploadAll();
      } else {
        this.invalid = true;
      }
    } else {
      this.size = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(this.filename);
  }

}