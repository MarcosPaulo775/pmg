import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  iframe: SafeResourceUrl;

  constructor(
    private router: Router,

    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private clipboardService: ClipboardService
  ) {
    this.iframe = sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  copy(){
    this.clipboardService.copyFromContent(this.url);
  }

  /** Fecha a caixa de dialogo */
  onNoClick(): void {
    this.dialogRef.close();
  }
}